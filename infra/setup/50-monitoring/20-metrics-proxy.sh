#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-metrics-proxy] root 権限で実行してください。" >&2
  exit 1
fi

: "${METRICS_ALLOW_IPS:?METRICS_ALLOW_IPS が未設定です}"

allow_lines=()
IFS=' ' read -r -a metrics_ips <<< "$METRICS_ALLOW_IPS"
for ip in "${metrics_ips[@]}"; do
  allow_lines+=("  allow ${ip};")
done
allow_block=$(printf '%s\n' "${allow_lines[@]}")

mkdir -p /etc/nginx/snippets

{
  printf "  location /metrics/node {\\n"
  printf "    proxy_pass http://127.0.0.1:9100/metrics;\\n"
  printf "%s" "$allow_block"
  printf "    deny all;\\n"
  printf "  }\\n\\n"
  printf "  location /metrics/mysql {\\n"
  printf "    proxy_pass http://127.0.0.1:9104/metrics;\\n"
  printf "%s" "$allow_block"
  printf "    deny all;\\n"
  printf "  }\\n"
} > /etc/nginx/snippets/metrics.conf

if ! nginx -t; then
  echo "[20-metrics-proxy] nginx 設定の検証に失敗しました。" >&2
  exit 1
fi

systemctl reload nginx
