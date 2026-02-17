#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-node] root 権限で実行してください。" >&2
  exit 1
fi

: "${NODE_VERSION:?NODE_VERSION が未設定です}"

node_major=$(echo "$NODE_VERSION" | cut -d. -f1)
node_repo="node_${node_major}.x"
if [ -x /usr/bin/node ]; then
  current_major=$(node -v | sed 's/v//' | cut -d. -f1)
  target_major="$node_major"
  if [ "$current_major" -eq "$target_major" ]; then
    exit 0
  fi
fi

install -m 0755 -d /etc/apt/keyrings
if [ ! -f /etc/apt/keyrings/nodesource.gpg ]; then
  # NOTE: TLS + OS の信頼ストアによる検証を前提に鍵を取得する
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
fi
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/${node_repo} nodistro main" > /etc/apt/sources.list.d/nodesource.list
apt-get update -y
apt-get install -y nodejs
