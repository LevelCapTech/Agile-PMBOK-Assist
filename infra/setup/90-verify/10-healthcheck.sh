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
  # nextjs
  fail2ban
  prometheus-node-exporter
  prometheus-mysqld-exporter
  postfix
)

for service in "${services[@]}"; do
  if ! systemctl is-active --quiet "$service"; then
    echo "[10-healthcheck] $service が起動していません。" >&2
    exit 1
  fi
done

certbot_timer="$(systemctl list-timers --no-legend | awk '$1 ~ /certbot.*\\.timer|snap\\.certbot.*\\.timer/ {print $1; exit}')"
if [ -z "$certbot_timer" ]; then
  echo "[10-healthcheck] certbot の timer が見つかりません。list-timers で環境の名称を確認してください。" >&2
  exit 1
fi
if ! systemctl is-active --quiet "$certbot_timer"; then
  echo "[10-healthcheck] certbot の timer が起動していません: $certbot_timer" >&2
  exit 1
fi

if ! nginx -t; then
  echo "[10-healthcheck] nginx 設定の検証に失敗しました。" >&2
  exit 1
fi

cert_dir="/etc/letsencrypt/live"
if [ ! -d "$cert_dir" ] || ! find "$cert_dir" -mindepth 1 -maxdepth 2 -type f -name "fullchain.pem" -print -quit | grep -q .; then
  echo "[10-healthcheck] certbot の証明書が見つかりません。certbot.service の実行状態と設定を確認してください。" >&2
  exit 1
fi

echo "[10-healthcheck] 主要サービスは起動しています。"
