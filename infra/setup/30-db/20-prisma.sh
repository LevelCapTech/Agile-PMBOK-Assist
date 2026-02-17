#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-prisma] root 権限で実行してください。" >&2
  exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/../shared.sh"

: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"
: "${MYSQL_APP_DB:?MYSQL_APP_DB が未設定です}"
: "${MYSQL_APP_USER:?MYSQL_APP_USER が未設定です}"
: "${MYSQL_APP_PASSWORD:?MYSQL_APP_PASSWORD が未設定です}"
: "${MYSQL_BIND_ADDRESS:?MYSQL_BIND_ADDRESS が未設定です}"

DATABASE_URL_VALUE="$(build_database_url)"

if [ ! -d "$APP_DIR" ]; then
  echo "[20-prisma] APP_DIR が見つからないため migrate をスキップします。"
  exit 0
fi

if [ ! -f "$APP_DIR/package.json" ] || [ ! -d "$APP_DIR/node_modules" ]; then
  echo "[20-prisma] 依存が未インストールのため migrate をスキップします。"
  exit 0
fi

if [ ! -f "$APP_DIR/prisma/schema.prisma" ]; then
  echo "[20-prisma] Prisma schema がないため migrate をスキップします。"
  exit 0
fi

sudo -u "$APP_USER" -- env DATABASE_URL="$DATABASE_URL_VALUE" bash -c "cd '$APP_DIR' && npx prisma migrate deploy"
