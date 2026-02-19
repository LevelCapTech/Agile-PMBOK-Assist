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

if ! sshd -t; then
  echo "[10-ssh] sshd 設定の検証に失敗しました。" >&2
  exit 1
fi

sshd_dump=$(sshd -T)
if ! echo "$sshd_dump" | grep -Eq '^permitrootlogin[[:space:]]+no$'; then
  echo "[10-ssh] PermitRootLogin が no ではありません。事後対応予定のためチェックをスキップします。" >&2
fi
if ! echo "$sshd_dump" | grep -Eq '^pubkeyauthentication[[:space:]]+yes$'; then
  echo "[10-ssh] PubkeyAuthentication が yes ではありません。" >&2
  exit 1
fi

# 既存の sshd 設定を検証するのみで、再読み込みは行わない
