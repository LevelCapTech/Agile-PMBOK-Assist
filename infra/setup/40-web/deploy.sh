#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[deploy] root 権限で実行してください。" >&2
  exit 1
fi

: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"
: "${APP_BRANCH:?APP_BRANCH が未設定です}"
: "${MYSQL_APP_DB:?MYSQL_APP_DB が未設定です}"
: "${MYSQL_APP_USER:?MYSQL_APP_USER が未設定です}"
: "${MYSQL_APP_PASSWORD:?MYSQL_APP_PASSWORD が未設定です}"
: "${MYSQL_BIND_ADDRESS:?MYSQL_BIND_ADDRESS が未設定です}"

if [ ! -d "$APP_DIR/.git" ]; then
  echo "[deploy] APP_DIR に git リポジトリがありません。" >&2
  exit 1
fi

DATABASE_URL_VALUE="${DATABASE_URL:-mysql://${MYSQL_APP_USER}:${MYSQL_APP_PASSWORD}@${MYSQL_BIND_ADDRESS}:3306/${MYSQL_APP_DB}}"

sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && git fetch --prune"
sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && git checkout '$APP_BRANCH'"
sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && git pull --ff-only origin '$APP_BRANCH'"

sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && npm ci"
sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && npm run build"

if [ -f "$APP_DIR/prisma/schema.prisma" ]; then
  sudo -u "$APP_USER" -- env DATABASE_URL="$DATABASE_URL_VALUE" bash -c "cd '$APP_DIR' && npx prisma migrate deploy"
fi

systemctl restart nextjs.service
