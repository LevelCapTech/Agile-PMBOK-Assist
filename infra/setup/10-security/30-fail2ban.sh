#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[30-fail2ban] root 権限で実行してください。" >&2
  exit 1
fi

cat <<'SSHJAIL' > /etc/fail2ban/jail.d/sshd.conf
[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
maxretry = 5
SSHJAIL

cat <<'NGINXJAIL' > /etc/fail2ban/jail.d/nginx-http-auth.conf
[nginx-http-auth]
enabled = true
port = https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 5
NGINXJAIL

if ! fail2ban-client -d >/dev/null; then
  echo "[30-fail2ban] fail2ban 設定の検証に失敗しました。" >&2
  exit 1
fi

systemctl enable --now fail2ban
