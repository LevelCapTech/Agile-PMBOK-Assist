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
apt-get install -y certbot

if [ "$ACME_CHALLENGE" != "dns-01" ]; then
  echo "[20-certbot] 443 のみ公開するため ACME_CHALLENGE は dns-01 を指定してください。" >&2
  exit 1
fi
if [ "${CERTBOT_DNS_PLUGIN:-}" != "manual" ]; then
  echo "[20-certbot] CERTBOT_DNS_PLUGIN は manual を指定してください。" >&2
  exit 1
fi
if [ -z "${CERTBOT_DNS_CREDENTIALS:-}" ]; then
  echo "[20-certbot] CERTBOT_DNS_CREDENTIALS が未設定です。" >&2
  exit 1
fi
if [ ! -f "$CERTBOT_DNS_CREDENTIALS" ]; then
  echo "[20-certbot] CERTBOT_DNS_CREDENTIALS のファイルが見つかりません: $CERTBOT_DNS_CREDENTIALS" >&2
  exit 1
fi
if [ ! -s "$CERTBOT_DNS_CREDENTIALS" ]; then
  echo "[20-certbot] CERTBOT_DNS_CREDENTIALS が空です: $CERTBOT_DNS_CREDENTIALS" >&2
  exit 1
fi
chmod 600 "$CERTBOT_DNS_CREDENTIALS"

hook_base="/etc/letsencrypt/valuedomain-hooks"
mkdir -p "$hook_base"
cat <<'HOOK' > "$hook_base/valuedomain-auth.sh"
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

api_key_file="${CERTBOT_DNS_CREDENTIALS:?CERTBOT_DNS_CREDENTIALS が未設定です}"
api_key="$(tr -d '\n' < "$api_key_file")"
domain="${CERTBOT_DOMAIN:?CERTBOT_DOMAIN が未設定です}"
validation="${CERTBOT_VALIDATION:?CERTBOT_VALIDATION が未設定です}"
api_endpoint="https://api.value-domain.com/v1/domains/${domain}/dns"

response="$(curl -fsS -H "Authorization: Bearer ${api_key}" "$api_endpoint")"
records="$(printf '%s' "$response" | python3 - <<'PY'
import json, sys
data=json.load(sys.stdin)
print(data["results"]["records"])
PY
)"

export VD_RECORDS="$records"
updated_records="$(python3 - <<'PY'
import os
records=os.environ.get("VD_RECORDS","")
validation=os.environ["CERTBOT_VALIDATION"]
line=f"txt _acme-challenge {validation}"
lines=[l for l in records.split("\\n") if l.strip()]
if line not in lines:
    lines.append(line)
print("\\n".join(lines))
PY
)"

export UPDATED_RECORDS="$updated_records"
payload="$(python3 - <<'PY'
import json, os
records=os.environ["UPDATED_RECORDS"]
print(json.dumps({"ns_type":"valuedomain1","records":records,"ttl":"3600"}))
PY
)"

curl -fsS -X PUT \
  -H "Authorization: Bearer ${api_key}" \
  -H "Content-Type: application/json" \
  -d "$payload" \
  "$api_endpoint"

sleep 60
HOOK

cat <<'HOOK' > "$hook_base/valuedomain-cleanup.sh"
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

api_key_file="${CERTBOT_DNS_CREDENTIALS:?CERTBOT_DNS_CREDENTIALS が未設定です}"
api_key="$(tr -d '\n' < "$api_key_file")"
domain="${CERTBOT_DOMAIN:?CERTBOT_DOMAIN が未設定です}"
validation="${CERTBOT_VALIDATION:?CERTBOT_VALIDATION が未設定です}"
api_endpoint="https://api.value-domain.com/v1/domains/${domain}/dns"

response="$(curl -fsS -H "Authorization: Bearer ${api_key}" "$api_endpoint")"
records="$(printf '%s' "$response" | python3 - <<'PY'
import json, sys
data=json.load(sys.stdin)
print(data["results"]["records"])
PY
)"

export VD_RECORDS="$records"
updated_records="$(python3 - <<'PY'
import os
records=os.environ.get("VD_RECORDS","")
validation=os.environ["CERTBOT_VALIDATION"]
line=f"txt _acme-challenge {validation}"
lines=[l for l in records.split("\\n") if l.strip() and l.strip()!=line]
print("\\n".join(lines))
PY
)"

export UPDATED_RECORDS="$updated_records"
payload="$(python3 - <<'PY'
import json, os
records=os.environ["UPDATED_RECORDS"]
print(json.dumps({"ns_type":"valuedomain1","records":records,"ttl":"3600"}))
PY
)"

curl -fsS -X PUT \
  -H "Authorization: Bearer ${api_key}" \
  -H "Content-Type: application/json" \
  -d "$payload" \
  "$api_endpoint"
HOOK

chmod +x "$hook_base/valuedomain-auth.sh" "$hook_base/valuedomain-cleanup.sh"

cert_path="/etc/letsencrypt/live/${ACME_DOMAIN}/fullchain.pem"
if [ -f "$cert_path" ]; then
  echo "[20-certbot] 証明書は既に存在します。"
else
  if ! certbot certonly --manual --preferred-challenges dns \
    --manual-auth-hook "$hook_base/valuedomain-auth.sh" \
    --manual-cleanup-hook "$hook_base/valuedomain-cleanup.sh" \
    --manual-public-ip-logging-ok \
    --non-interactive --agree-tos -m "$ACME_EMAIL" \
    -d "$ACME_DOMAIN"; then
    echo "[20-certbot] DNS-01 証明書取得に失敗しました。" >&2
    exit 1
  fi
fi

hook_dir="/etc/letsencrypt/renewal-hooks/deploy"
mkdir -p "$hook_dir"
cat <<'HOOK' > "$hook_dir/reload-nginx.sh"
#!/usr/bin/env bash
set -euo pipefail
systemctl reload nginx
HOOK
chmod +x "$hook_dir/reload-nginx.sh"

if systemctl list-timers --all | grep -q "certbot.timer"; then
  systemctl enable --now certbot.timer
else
  echo "[20-certbot] certbot.timer が見つかりません。list-timers で確認してください。" >&2
fi
