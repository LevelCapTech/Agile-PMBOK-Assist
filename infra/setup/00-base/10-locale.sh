#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-locale] root 権限で実行してください。" >&2
  exit 1
fi

: "${TIMEZONE:?TIMEZONE が未設定です}"
: "${LANG:?LANG が未設定です}"

timedatectl set-timezone "$TIMEZONE"
locale-gen "$LANG"
localectl set-locale "LANG=$LANG" "LC_ALL=$LANG"

cat <<LOCALE > /etc/default/locale
LANG=$LANG
LC_ALL=$LANG
LOCALE
