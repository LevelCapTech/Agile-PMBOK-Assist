#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-metrics-proxy] root 権限で実行してください。" >&2
  exit 1
fi

: "${METRICS_ALLOW_IPS:?METRICS_ALLOW_IPS が未設定です}"

allow_block=""
for ip in $METRICS_ALLOW_IPS; do
  allow_block+=$'  allow '"${ip}"$';\n'
done

mkdir -p /etc/nginx/snippets

cat <<METRICS > /etc/nginx/snippets/metrics.conf
  location /metrics/node {
    proxy_pass http://127.0.0.1:9100/metrics;
${allow_block}    deny all;
  }

  location /metrics/mysql {
    proxy_pass http://127.0.0.1:9104/metrics;
${allow_block}    deny all;
  }
METRICS

if ! nginx -t; then
  echo "[20-metrics-proxy] nginx 設定の検証に失敗しました。" >&2
  exit 1
fi

systemctl reload nginx
