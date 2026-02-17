#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-healthcheck] root 権限で実行してください。" >&2
  exit 1
fi

services=(
  mysql
  nginx
  nextjs
  fail2ban
  prometheus-node-exporter
  prometheus-mysqld-exporter
  postfix
  certbot.timer
)

for service in "${services[@]}"; do
  if ! systemctl is-active --quiet "$service"; then
    echo "[10-healthcheck] $service が起動していません。" >&2
    exit 1
  fi
done

if ! nginx -t; then
  echo "[10-healthcheck] nginx 設定の検証に失敗しました。" >&2
  exit 1
fi

echo "[10-healthcheck] 主要サービスは起動しています。"
