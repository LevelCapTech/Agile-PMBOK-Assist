#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-metrics-proxy] root 権限で実行してください。" >&2
  exit 1
fi

allow_lines=()
metrics_ips=()
if [ -n "${METRICS_ALLOW_IPS:-}" ]; then
  IFS=' ' read -r -a metrics_ips <<< "$METRICS_ALLOW_IPS"
fi
if [ "${#metrics_ips[@]}" -eq 0 ]; then
  echo "[20-metrics-proxy][WARNING] METRICS_ALLOW_IPS が未指定のため全 IP 許可になります。セキュリティリスクがあるため明示指定してください。" >&2
  allow_lines+=("    allow all;")
else
  for ip in "${metrics_ips[@]}"; do
    allow_lines+=("    allow ${ip};")
  done
fi
allow_block=$(printf '%s\n' "${allow_lines[@]}")

mkdir -p /etc/nginx/snippets

{
  cat <<'NODE'
  location /metrics/node {
    proxy_pass http://127.0.0.1:9100/metrics;
NODE
  printf '%s\n' "$allow_block"
  cat <<'NODETAIL'
    deny all;
  }

  location /metrics/mysql {
    proxy_pass http://127.0.0.1:9104/metrics;
NODETAIL
  printf '%s\n' "$allow_block"
  cat <<'TAIL'
    deny all;
  }
TAIL
} > /etc/nginx/snippets/metrics.conf

if ! nginx -t; then
  echo "[20-metrics-proxy] nginx 設定の検証に失敗しました。" >&2
  exit 1
fi

systemctl reload nginx
