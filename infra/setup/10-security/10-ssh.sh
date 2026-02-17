#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-ssh] root 権限で実行してください。" >&2
  exit 1
fi

: "${APP_USER:?APP_USER が未設定です}"

if ! id -u "$APP_USER" >/dev/null 2>&1; then
  echo "[10-ssh] APP_USER が存在しません。先にユーザーと SSH 鍵を準備してください。" >&2
  exit 1
fi

user_home=$(getent passwd "$APP_USER" | cut -d: -f6)
if [ ! -f "$user_home/.ssh/authorized_keys" ]; then
  echo "[10-ssh] $APP_USER の authorized_keys が見つかりません。ロックアウト防止のため終了します。" >&2
  exit 1
fi

sshd_dropin="/etc/ssh/sshd_config.d/99-infra-hardening.conf"
if [ -f "$sshd_dropin" ]; then
  cp "$sshd_dropin" "${sshd_dropin}.bak.$(date +%s)"
fi

cat <<'SSHCONF' > "$sshd_dropin"
PermitRootLogin no
PubkeyAuthentication yes
SSHCONF

if ! sshd -t; then
  echo "[10-ssh] sshd 設定の検証に失敗しました。" >&2
  exit 1
fi

systemctl reload ssh
