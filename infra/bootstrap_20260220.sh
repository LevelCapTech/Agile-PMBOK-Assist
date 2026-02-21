#!/usr/bin/env bash

# NOTE:
# このスクリプトは 2026-02-20 時点の Next.js サービス向けの一時的なブートストラップ用スクリプトです。
# 既存の infra/bootstrap.sh とは別系統で段階的な移行を行うため、意図的に日付付きファイル名
# (bootstrap_20260220.sh) を採用しています。
# 移行が完了し、本スクリプトの手順が安定したら、内容を必要に応じて infra/bootstrap.sh 等へ統合し、
# このファイルは削除することを想定しています。
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[bootstrap_20260220] root 権限で実行してください。" >&2
  exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ENV_FILE="${ENV_FILE:-${SCRIPT_DIR}/.env}"

if [ ! -f "$ENV_FILE" ]; then
  echo "[bootstrap_20260220] 環境変数ファイルが見つかりません: $ENV_FILE" >&2
  exit 1
fi

chmod 600 "$ENV_FILE"

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

steps=(
  "setup/40-web/30-nextjs-service.sh"
)

for step in "${steps[@]}"; do
  step_path="$SCRIPT_DIR/$step"
  if [ ! -f "$step_path" ]; then
    echo "[bootstrap_20260220] スクリプトが見つかりません: $step_path" >&2
    exit 1
  fi
  echo "[bootstrap_20260220] 実行: $step"
  bash "$step_path" || {
    status=$?
    echo "[bootstrap_20260220] 失敗: $step (exit code: $status)" >&2
    exit "$status"
  }
done

systemctl daemon-reload
systemctl restart nextjs.service
systemctl status nextjs.service --no-pager -l

healthcheck_path="$SCRIPT_DIR/setup/90-verify/10-healthcheck.sh"
if [ ! -f "$healthcheck_path" ]; then
  echo "[bootstrap_20260220] ヘルスチェックが見つかりません: $healthcheck_path" >&2
  exit 1
fi

bash "$healthcheck_path"
