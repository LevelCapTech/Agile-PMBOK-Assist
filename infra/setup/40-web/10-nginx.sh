#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[10-nginx] root 権限で実行してください。" >&2
  exit 1
fi

: "${ACME_DOMAIN:?ACME_DOMAIN が未設定です}"

cert_path="/etc/letsencrypt/live/${ACME_DOMAIN}/fullchain.pem"
key_path="/etc/letsencrypt/live/${ACME_DOMAIN}/privkey.pem"
if [ -f "$cert_path" ] && [ -f "$key_path" ]; then
  ssl_cert="$cert_path"
  ssl_key="$key_path"
else
  ssl_cert="/etc/ssl/certs/ssl-cert-snakeoil.pem"
  ssl_key="/etc/ssl/private/ssl-cert-snakeoil.key"
  echo "[10-nginx] Let’s Encrypt 証明書がないため一時的に snakeoil 証明書を使用します。" >&2
fi

export DEBIAN_FRONTEND=noninteractive
apt-get install -y nginx

limit_conf="/etc/nginx/conf.d/limit_req.conf"
cat <<'LIMIT' > "$limit_conf"
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
LIMIT

site_conf="/etc/nginx/sites-available/app.conf"
if [ -f "$site_conf" ]; then
  cp "$site_conf" "${site_conf}.bak.$(date +%s)"
fi

cat <<'SITE' > "$site_conf"
server {
  listen 443 ssl http2;
  server_name __ACME_DOMAIN__;

  ssl_certificate __SSL_CERT__;
  ssl_certificate_key __SSL_KEY__;

  location / {
    limit_req zone=one burst=20 nodelay;
    proxy_pass http://127.0.0.1:4000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
  }

  include /etc/nginx/conf.d/metrics.conf;
}
SITE
sed -i "s/__ACME_DOMAIN__/${ACME_DOMAIN}/" "$site_conf"
sed -i "s|__SSL_CERT__|${ssl_cert}|" "$site_conf"
sed -i "s|__SSL_KEY__|${ssl_key}|" "$site_conf"

metrics_conf="/etc/nginx/conf.d/metrics.conf"
if [ ! -f "$metrics_conf" ]; then
  echo "# metrics placeholder" > "$metrics_conf"
fi

ln -sf "$site_conf" /etc/nginx/sites-enabled/app.conf
rm -f /etc/nginx/sites-enabled/default

if ! nginx -t; then
  echo "[10-nginx] nginx 設定の検証に失敗しました。" >&2
  exit 1
fi

systemctl enable --now nginx
systemctl reload nginx
