#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[20-certbot] root 権限で実行してください。" >&2
  exit 1
fi

: "${ACME_DOMAIN:?ACME_DOMAIN が未設定です}"
: "${ACME_EMAIL:?ACME_EMAIL が未設定です}"
: "${ACME_CHALLENGE:?ACME_CHALLENGE が未設定です}"

export DEBIAN_FRONTEND=noninteractive
apt-get install -y certbot python3-certbot-nginx

cert_path="/etc/letsencrypt/live/${ACME_DOMAIN}/fullchain.pem"
if [ -f "$cert_path" ]; then
  echo "[20-certbot] 証明書は既に存在します。"
else
  case "$ACME_CHALLENGE" in
    tls-alpn-01)
      if ! certbot --nginx --preferred-challenges tls-alpn-01 -d "$ACME_DOMAIN" --non-interactive --agree-tos -m "$ACME_EMAIL"; then
        echo "[20-certbot] 証明書取得に失敗しました。" >&2
        exit 1
      fi
      ;;
    dns-01)
      if [ -z "${CERTBOT_DNS_PLUGIN:-}" ] || [ -z "${CERTBOT_DNS_CREDENTIALS:-}" ]; then
        echo "[20-certbot] DNS-01 には DNS プラグイン設定が必要です。" >&2
        exit 1
      fi
      if ! certbot certonly --non-interactive --agree-tos -m "$ACME_EMAIL" \
        --dns-"$CERTBOT_DNS_PLUGIN" \
        --dns-"$CERTBOT_DNS_PLUGIN"-credentials "$CERTBOT_DNS_CREDENTIALS" \
        -d "$ACME_DOMAIN"; then
        echo "[20-certbot] DNS-01 証明書取得に失敗しました。" >&2
        exit 1
      fi
      ;;
    *)
      echo "[20-certbot] 未対応の ACME_CHALLENGE: $ACME_CHALLENGE" >&2
      exit 1
      ;;
  esac
fi

hook_dir="/etc/letsencrypt/renewal-hooks/deploy"
mkdir -p "$hook_dir"
cat <<'HOOK' > "$hook_dir/reload-nginx.sh"
#!/usr/bin/env bash
set -euo pipefail
systemctl reload nginx
HOOK
chmod +x "$hook_dir/reload-nginx.sh"

systemctl enable --now certbot.timer
