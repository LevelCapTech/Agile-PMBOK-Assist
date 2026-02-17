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
npm_bin=$(command -v npm || true)
npx_bin=$(command -v npx || true)
node_bin=$(command -v node || true)
flock_bin=$(command -v flock || true)
for cmd in "$npm_bin" "$npx_bin" "$node_bin" "$flock_bin"; do
  if [ -z "$cmd" ] || [ ! -x "$cmd" ]; then
    echo "[deploy] 必要コマンドが見つかりません。" >&2
    exit 1
  fi
done

DATABASE_URL_VALUE="$(build_database_url)"

set -a
# shellcheck disable=SC1090
source "$APP_ENV_FILE"
set +a

if [ -n "${APP_PORT:-}" ] && [ -n "${PORT:-}" ] && [ "$APP_PORT" != "$PORT" ]; then
  echo "[deploy] APP_PORT と APP_ENV_FILE の PORT が一致していません: ${APP_PORT} / ${PORT}" >&2
  echo "[deploy] Nginx の proxy 先ポートとアプリの PORT を一致させてください。" >&2
  exit 1
fi

lock_file="/var/lock/nextjs-build.lock"
exec 9>"$lock_file"
if ! "$flock_bin" -n 9; then
  echo "[deploy] 既にビルドが実行中です。" >&2
  exit 1
fi

sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && $npm_bin ci"
sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && $npm_bin run build"

if [ -f "$APP_DIR/prisma/schema.prisma" ]; then
  sudo -u "$APP_USER" -- env DATABASE_URL="$DATABASE_URL_VALUE" bash -c "cd '$APP_DIR' && $npx_bin prisma migrate deploy"
fi

systemctl restart nextjs.service
