#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[30-nextjs-service] root 権限で実行してください。" >&2
  exit 1
fi

: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"
: "${APP_ENV_FILE:?APP_ENV_FILE が未設定です}"

if ! id -u "$APP_USER" >/dev/null 2>&1; then
  echo "[30-nextjs-service] APP_USER が存在しません。先にユーザーを作成してください。" >&2
  exit 1
fi
if [ ! -f "$APP_ENV_FILE" ]; then
  echo "[30-nextjs-service] APP_ENV_FILE が見つかりません: $APP_ENV_FILE" >&2
  exit 1
fi
if [[ "$APP_ENV_FILE" != /* ]]; then
  echo "[30-nextjs-service] APP_ENV_FILE は絶対パスで指定してください。" >&2
  exit 1
fi

service_file="/etc/systemd/system/nextjs.service"
if [ -f "$service_file" ]; then
  cp "$service_file" "${service_file}.bak.$(date +%s)"
fi

port_env_var_ref="\$PORT"

cat <<SERVICE > "$service_file"
[Unit]
Description=Next.js SSR Application
Wants=network-online.target mysql.service
After=network-online.target mysql.service

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
EnvironmentFile=${APP_ENV_FILE}
ExecStart=/usr/bin/node ${APP_DIR}/node_modules/next/dist/bin/next start -p ${port_env_var_ref}
Restart=always
RestartSec=5
LimitNOFILE=65535
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE

mkdir -p /var/log/nextjs
chown "$APP_USER":"$APP_USER" /var/log/nextjs

cat <<LOGROTATE > /etc/logrotate.d/nextjs
/var/log/nextjs/*.log {
  daily
  rotate 7
  compress
  missingok
  notifempty
  create 0640 ${APP_USER} ${APP_USER}
}
LOGROTATE

systemctl daemon-reload
systemctl enable --now nextjs.service
