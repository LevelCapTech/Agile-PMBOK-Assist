#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-shell] root 権限で実行してください。" >&2
  exit 1
fi

: "${APP_USER:?APP_USER が未設定です}"

read -r -d '' BASHRC_BLOCK <<'BLOCK'
# ---- infra bootstrap ----
export HISTTIMEFORMAT='%F %T '
alias ll='ls -alF'
export HISTCONTROL=ignoreboth
export HISTSIZE=10000
export HISTFILESIZE=20000
# ---- infra bootstrap ----
BLOCK

append_block() {
  local target="$1"
  if [ ! -f "$target" ]; then
    touch "$target"
  fi
  if ! grep -q "infra bootstrap" "$target"; then
    printf "\n%s\n" "$BASHRC_BLOCK" >> "$target"
  fi
}

append_block "/root/.bashrc"
append_block "/etc/skel/.bashrc"

if id -u "$APP_USER" >/dev/null 2>&1; then
  user_home=$(getent passwd "$APP_USER" | cut -d: -f6)
  if [ -n "$user_home" ]; then
    append_block "$user_home/.bashrc"
    chown "$APP_USER":"$APP_USER" "$user_home/.bashrc"
  fi
fi
