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

certbot_timers="$(systemctl list-timers --all --no-legend)"
certbot_timer="$(printf '%s\n' "$certbot_timers" | awk '
  BEGIN {found=0}
  {
    line=tolower($0)
    if (line ~ /certbot.*\.timer/ || line ~ /snap\.certbot.*\.timer/) {
      if (NF>=2) {print $(NF-1); found=1; exit}
    }
  }
  END {if (!found) exit 1}
')"
if [ -z "$certbot_timer" ]; then
  echo "[10-healthcheck] certbot の timer が見つかりません。list-timers で環境の名称を確認してください。" >&2
  echo "[10-healthcheck] systemd timers (certbot 抜粋):" >&2
  printf '%s\n' "$certbot_timers" | awk 'tolower($0) ~ /certbot/ {print "  " $0}' >&2
  exit 1
fi
echo "[10-healthcheck] certbot timer 判定: $certbot_timer" >&2
if ! systemctl is-active --quiet "$certbot_timer"; then
  echo "[10-healthcheck] certbot の timer が起動していません: $certbot_timer" >&2
  exit 1
fi

if ! nginx -t; then
  echo "[10-healthcheck] nginx 設定の検証に失敗しました。" >&2
  exit 1
fi

cert_dir="/etc/letsencrypt/live"
if [ ! -d "$cert_dir" ] || ! find "$cert_dir" -mindepth 1 -maxdepth 2 \( -type f -o -type l \) -name "fullchain.pem" -print -quit | grep -q .; then
  echo "[10-healthcheck] certbot の証明書が見つかりません。certbot.service の実行状態と設定を確認してください。" >&2
  exit 1
fi

echo "[10-healthcheck] 主要サービスは起動しています。"
