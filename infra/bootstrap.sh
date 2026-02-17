#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[bootstrap] root 権限で実行してください。" >&2
  exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ENV_FILE="${ENV_FILE:-${SCRIPT_DIR}/.env}"

if [ ! -f "$ENV_FILE" ]; then
  echo "[bootstrap] 環境変数ファイルが見つかりません: $ENV_FILE" >&2
  exit 1
fi

chmod 600 "$ENV_FILE"

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

steps=(
  "setup/00-base/00-packages.sh"
  "setup/00-base/10-locale.sh"
  "setup/00-base/20-shell.sh"
  "setup/00-base/30-motd.sh"
  "setup/10-security/10-ssh.sh"
  "setup/10-security/30-fail2ban.sh"
  "setup/10-security/20-ufw.sh"
  "setup/20-runtime/10-node.sh"
  "setup/20-runtime/20-git.sh"
  "setup/30-db/10-mysql.sh"
  "setup/30-db/20-prisma.sh"
  "setup/40-web/10-nginx.sh"
  "setup/40-web/20-certbot.sh"
  "setup/40-web/30-nextjs-service.sh"
  "setup/50-monitoring/10-exporters.sh"
  "setup/50-monitoring/20-metrics-proxy.sh"
  "setup/60-mail/10-postfix.sh"
  "setup/90-verify/10-healthcheck.sh"
)

for step in "${steps[@]}"; do
  step_path="$SCRIPT_DIR/$step"
  if [ ! -f "$step_path" ]; then
    echo "[bootstrap] スクリプトが見つかりません: $step_path" >&2
    exit 1
  fi
  echo "[bootstrap] 実行: $step"
  bash "$step_path"
done
