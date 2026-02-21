#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[31-release-poll-deploy] root 権限で実行してください。" >&2
  exit 1
fi

: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"
: "${GITHUB_APP_ID:?GITHUB_APP_ID が未設定です}"
: "${GITHUB_INSTALLATION_ID:?GITHUB_INSTALLATION_ID が未設定です}"
: "${GITHUB_APP_PEM_PATH:?GITHUB_APP_PEM_PATH が未設定です}"
: "${APP_REPO_URL:?APP_REPO_URL が未設定です}"

if [[ "$APP_DIR" != /* ]]; then
  echo "[31-release-poll-deploy] APP_DIR は絶対パスで指定してください。" >&2
  exit 1
fi
if ! id -u "$APP_USER" >/dev/null 2>&1; then
  echo "[31-release-poll-deploy] APP_USER が存在しません: $APP_USER" >&2
  exit 1
fi
if [ ! -f "$GITHUB_APP_PEM_PATH" ]; then
  echo "[31-release-poll-deploy] GITHUB_APP_PEM_PATH が見つかりません: $GITHUB_APP_PEM_PATH" >&2
  exit 1
fi
pem_mode="$(stat -c '%a' "$GITHUB_APP_PEM_PATH" 2>/dev/null || stat -f '%Lp' "$GITHUB_APP_PEM_PATH" 2>/dev/null || echo "")"
if [[ ! "$pem_mode" =~ ^0*400$ && ! "$pem_mode" =~ ^0*600$ ]]; then
  echo "[31-release-poll-deploy] GITHUB_APP_PEM_PATH のパーミッションが不正です: $GITHUB_APP_PEM_PATH (mode=${pem_mode:-unknown})" >&2
  exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
release_deploy_source="${SCRIPT_DIR}/../40-web/40-release-poll-deploy.sh"
release_deploy_bin="/usr/local/bin/agile-pmbok-assist-release-poll-deploy.sh"
if [ ! -f "$release_deploy_source" ]; then
  echo "[31-release-poll-deploy] デプロイスクリプトが見つかりません: $release_deploy_source" >&2
  exit 1
fi

install -m 750 "$release_deploy_source" "$release_deploy_bin"

deploy_env_dir="/etc/agile-pmbok-assist"
deploy_env_file="${deploy_env_dir}/release-deploy.env"
install -d -m 700 "$deploy_env_dir"
cat <<ENV > "$deploy_env_file"
APP_DIR=${APP_DIR}
APP_USER=${APP_USER}
APP_REPO_URL=${APP_REPO_URL}
GITHUB_APP_ID=${GITHUB_APP_ID}
GITHUB_INSTALLATION_ID=${GITHUB_INSTALLATION_ID}
GITHUB_APP_PEM_PATH=${GITHUB_APP_PEM_PATH}
RELEASE_ASSET_NAME=next-bundle.tgz
DEPLOY_SERVICE_NAME=nextjs.service
ENV
chmod 600 "$deploy_env_file"

for unit in agile-pmbok-assist-pull.timer agile-pmbok-assist-pull.service; do
  if systemctl list-unit-files --type=service --type=timer | grep -q "^${unit}"; then
    systemctl disable --now "$unit" || true
  fi
done

service_file="/etc/systemd/system/agile-pmbok-assist-release-deploy.service"
if [ -f "$service_file" ]; then
  cp "$service_file" "${service_file}.bak.$(date +%s)"
fi
cat <<SERVICE > "$service_file"
[Unit]
Description=Deploy agile-pmbok-assist from GitHub Releases
Wants=network-online.target
After=network-online.target

[Service]
Type=oneshot
User=root
EnvironmentFile=${deploy_env_file}
ExecStart=${release_deploy_bin}
SERVICE

timer_file="/etc/systemd/system/agile-pmbok-assist-release-deploy.timer"
if [ -f "$timer_file" ]; then
  cp "$timer_file" "${timer_file}.bak.$(date +%s)"
fi
cat <<TIMER > "$timer_file"
[Unit]
Description=Periodic release polling deploy for agile-pmbok-assist

[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
Persistent=true

[Install]
WantedBy=timers.target
TIMER

systemctl daemon-reload
systemctl enable --now agile-pmbok-assist-release-deploy.timer
