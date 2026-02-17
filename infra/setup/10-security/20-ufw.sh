#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-ufw] root 権限で実行してください。" >&2
  exit 1
fi

if ! systemctl is-active --quiet fail2ban; then
  echo "[20-ufw] fail2ban が未起動です。先に fail2ban を有効化してください。" >&2
  exit 1
fi

ufw default deny incoming
ufw default allow outgoing

ufw allow 443/tcp
ufw allow 22/tcp

if ufw status | grep -q inactive; then
  ufw --force enable
else
  ufw reload
fi
