#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[deploy] root 権限で実行してください。" >&2
  exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/../shared.sh"

: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"
: "${APP_ENV_FILE:?APP_ENV_FILE が未設定です}"
: "${MYSQL_APP_DB:?MYSQL_APP_DB が未設定です}"
: "${MYSQL_APP_USER:?MYSQL_APP_USER が未設定です}"
: "${MYSQL_APP_PASSWORD:?MYSQL_APP_PASSWORD が未設定です}"
: "${MYSQL_BIND_ADDRESS:?MYSQL_BIND_ADDRESS が未設定です}"

if [ ! -d "$APP_DIR" ]; then
  echo "[deploy] APP_DIR が見つかりません: $APP_DIR" >&2
  exit 1
fi
if [ ! -f "$APP_ENV_FILE" ]; then
  echo "[deploy] APP_ENV_FILE が見つかりません: $APP_ENV_FILE" >&2
  exit 1
fi
for name in npm npx node flock; do
  cmd=$(command -v "$name" || true)
  if [ -z "$cmd" ] || [ ! -x "$cmd" ]; then
    echo "[deploy] 必要コマンドが見つかりません: $name" >&2
    exit 1
  fi
  case "$name" in
    npm) npm_bin=$cmd ;;
    npx) npx_bin=$cmd ;;
    node) node_bin=$cmd ;;
    flock) flock_bin=$cmd ;;
  esac
done
: "$node_bin"

DATABASE_URL_VALUE="$(build_database_url)"

set -a
# shellcheck disable=SC1090
source "$APP_ENV_FILE"
set +a

if [ -z "${APP_PORT:-}" ]; then
  echo "[deploy] APP_PORT が未設定です。" >&2
  exit 1
fi
if [ -z "${PORT:-}" ]; then
  echo "[deploy] APP_ENV_FILE の PORT が未設定です。" >&2
  exit 1
fi
is_valid_port() {
  [[ "$1" =~ ^[0-9]+$ ]] && (( $1 >= 1 && $1 <= 65535 ))
}
if ! is_valid_port "$APP_PORT"; then
  echo "[deploy] APP_PORT が不正です: $APP_PORT" >&2
  exit 1
fi
if ! is_valid_port "$PORT"; then
  echo "[deploy] APP_ENV_FILE の PORT が不正です: $PORT" >&2
  exit 1
fi
if [ "$APP_PORT" != "$PORT" ]; then
  echo "[deploy] APP_PORT と APP_ENV_FILE の PORT が一致していません: ${APP_PORT} / ${PORT}" >&2
  echo "[deploy] Nginx の proxy 先ポートとアプリの PORT を一致させてください。" >&2
  echo "[deploy] APP_PORT を ${ENV_FILE:-infra/.env} または PORT を ${APP_ENV_FILE} で修正してください。" >&2
  exit 1
fi

lock_file="/var/lock/nextjs-build.lock"
exec 9>"$lock_file"
cleanup_lock() {
  exec 9>&- || true
  rm -f "$lock_file"
}
trap cleanup_lock EXIT
if ! "$flock_bin" -n 9; then
  echo "[deploy] 既にビルドが実行中です。" >&2
  exit 1
fi

if ! sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && $npm_bin ci"; then
  echo "[deploy] npm ci に失敗しました。デプロイを中止します。" >&2
  exit 1
fi
if ! sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && $npm_bin run build"; then
  echo "[deploy] npm run build に失敗しました。デプロイを中止します。" >&2
  exit 1
fi

if [ -f "$APP_DIR/prisma/schema.prisma" ]; then
  sudo -u "$APP_USER" -- env DATABASE_URL="$DATABASE_URL_VALUE" bash -c "cd '$APP_DIR' && $npx_bin prisma migrate deploy"
fi

systemctl restart nextjs.service
