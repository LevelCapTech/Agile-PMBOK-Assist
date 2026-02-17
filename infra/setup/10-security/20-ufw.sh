#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-ufw] root 権限で実行してください。" >&2
  exit 1
fi

: "${SSH_ALLOW_IPS:?SSH_ALLOW_IPS が未設定です}"

ufw default deny incoming
ufw default allow outgoing

ufw allow 443/tcp

for ip in $SSH_ALLOW_IPS; do
  ufw allow from "$ip" to any port 22 proto tcp
done

if ufw status | grep -q inactive; then
  ufw --force enable
else
  ufw reload
fi
