#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-git] root 権限で実行してください。" >&2
  exit 1
fi

# GitHub App 連携に必要な curl/jq/openssl は 00-packages.sh で導入済み
apt-get install -y git
