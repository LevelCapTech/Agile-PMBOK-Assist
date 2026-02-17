#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-git] root 権限で実行してください。" >&2
  exit 1
fi

apt-get install -y git
