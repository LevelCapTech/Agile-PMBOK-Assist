#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-node] root 権限で実行してください。" >&2
  exit 1
fi

: "${NODE_VERSION:?NODE_VERSION が未設定です}"

if [[ "$NODE_VERSION" == *".x" ]]; then
  node_setup="setup_${NODE_VERSION}"
else
  node_setup="setup_${NODE_VERSION}.x"
fi
if [ -x /usr/bin/node ]; then
  current_major=$(node -v | sed 's/v//' | cut -d. -f1)
  target_major=$(echo "$NODE_VERSION" | cut -d. -f1)
  if [ "$current_major" = "$target_major" ]; then
    exit 0
  fi
fi

temp_script=$(mktemp)
trap 'rm -f "$temp_script"' EXIT
curl -fsSL "https://deb.nodesource.com/${node_setup}" -o "$temp_script"
bash "$temp_script"
rm -f "$temp_script"
trap - EXIT
apt-get install -y nodejs
