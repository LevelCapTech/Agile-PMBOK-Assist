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

api_key_file="${CERTBOT_DNS_CREDENTIALS:-/etc/letsencrypt/valuedomain-apikey.txt}"
if [ ! -f "$api_key_file" ] || [ ! -s "$api_key_file" ]; then
  echo "[valuedomain-auth] API キーファイルが見つからないか空です: $api_key_file" >&2
  exit 1
fi
api_key="$(tr -d '\n' < "$api_key_file")"
if [ -z "$api_key" ]; then
  echo "[valuedomain-auth] API キーが空です: $api_key_file" >&2
  exit 1
fi
domain="${CERTBOT_DOMAIN:?CERTBOT_DOMAIN が未設定です}"
validation="${CERTBOT_VALIDATION:?CERTBOT_VALIDATION が未設定です}"
base_domain="$(awk -F. '{print $(NF-1)"."$NF}' <<< "$domain")"
api_endpoint="https://api.value-domain.com/v1/domains/${base_domain}/dns"

request_api() {
  local method="$1"
  local payload="${2:-}"
  local response
  local http_code
  local body
  local curl_config
  curl_config="$(mktemp)"
  trap 'rm -f "$curl_config"' RETURN
  cat > "$curl_config" <<EOF
header = "Authorization: Bearer ${api_key}"
EOF
  chmod 600 "$curl_config"
  if [ -n "$payload" ]; then
    response="$(curl -sS -w '\n%{http_code}' -X "$method" -K "$curl_config" \
      -H "Content-Type: application/json" -d "$payload" "$api_endpoint")" || {
      echo "[valuedomain-auth] DNS レコード更新 API 呼び出し (${method}) に失敗しました" >&2
      exit 1
    }
  else
    response="$(curl -sS -w '\n%{http_code}' -X "$method" -K "$curl_config" \
      "$api_endpoint")" || {
      echo "[valuedomain-auth] DNS レコード取得 API 呼び出し (${method}) に失敗しました" >&2
      exit 1
    }
  fi
  http_code="$(printf '%s\n' "$response" | tail -n1)"
  body="$(printf '%s\n' "$response" | sed '$d')"
  if [ "$http_code" -ge 400 ]; then
    echo "[valuedomain-auth] HTTP エラー (${method}): $http_code" >&2
    printf '%s\n' "$body" >&2
    exit 1
  fi
  printf '%s' "$body"
}

response="$(request_api GET)"
export VD_RESPONSE="$response"
ns_type="$(python3 - <<'PY'
import json, os, sys
response = os.environ.get("VD_RESPONSE", "")
if not response:
    print("[valuedomain-auth] API レスポンスが空です", file=sys.stderr)
    sys.exit(1)
try:
    data = json.loads(response)
except json.JSONDecodeError as e:
    print(f"[valuedomain-auth] JSON デコードに失敗しました: {e}", file=sys.stderr)
    sys.exit(1)
try:
    ns_type = data["results"]["ns_type"]
except (KeyError, TypeError) as e:
    print(f"[valuedomain-auth] API レスポンスの形式が想定外です: {e}", file=sys.stderr)
    sys.exit(1)
print(ns_type)
PY
)"
records="$(python3 - <<'PY'
import json, os, sys
response = os.environ.get("VD_RESPONSE", "")
if not response:
    print("[valuedomain-auth] API レスポンスが空です", file=sys.stderr)
    sys.exit(1)
try:
    data = json.loads(response)
except json.JSONDecodeError as e:
    print(f"[valuedomain-auth] JSON デコードに失敗しました: {e}", file=sys.stderr)
    sys.exit(1)
try:
    records = data["results"]["records"]
except (KeyError, TypeError) as e:
    print(f"[valuedomain-auth] API レスポンスの形式が想定外です: {e}", file=sys.stderr)
    sys.exit(1)
print(records)
PY
)"

export VD_RECORDS="$records"
export VD_DOMAIN="$domain"
export VD_BASE_DOMAIN="$base_domain"
record_name="$(python3 - <<'PY'
import os, sys
domain = os.environ["VD_DOMAIN"]
base_domain = os.environ["VD_BASE_DOMAIN"]
if domain == base_domain:
    name = "_acme-challenge"
elif domain.endswith("." + base_domain):
    host = domain[: -(len(base_domain) + 1)]
    name = f"_acme-challenge.{host}"
else:
    print("[valuedomain-auth] base_domain の判定に失敗しました", file=sys.stderr)
    sys.exit(1)
print(name)
PY
)"
updated_records="$(python3 - <<'PY'
import os
records=os.environ.get("VD_RECORDS","")
validation=os.environ["CERTBOT_VALIDATION"]
record_name=os.environ["VD_RECORD_NAME"]
line=f"txt {record_name} {validation}"
lines=[l for l in records.splitlines() if l.strip()]
if line not in lines:
    lines.append(line)
print("\n".join(lines))
PY
)"

export UPDATED_RECORDS="$updated_records"
export VD_RECORD_NAME="$record_name"
export VD_NS_TYPE="$ns_type"
payload="$(python3 - <<'PY'
import json, os
records=os.environ["UPDATED_RECORDS"]
ns_type=os.environ["VD_NS_TYPE"]
print(json.dumps({"ns_type":ns_type,"records":records,"ttl":"3600"}))
PY
)"

request_api PUT "$payload" >/dev/null
# DNS 伝播待ち時間は CERTBOT_DNS_PROPAGATION_SECONDS で調整可能（未設定時は 60 秒）
propagation_seconds="${CERTBOT_DNS_PROPAGATION_SECONDS:-60}"
sleep "$propagation_seconds"
HOOK

cat <<'HOOK' > "$hook_base/valuedomain-cleanup.sh"
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

api_key_file="${CERTBOT_DNS_CREDENTIALS:-/etc/letsencrypt/valuedomain-apikey.txt}"
if [ ! -f "$api_key_file" ] || [ ! -s "$api_key_file" ]; then
  echo "[valuedomain-cleanup] API キーファイルが見つからないか空です: $api_key_file" >&2
  exit 1
fi
api_key="$(tr -d '\n' < "$api_key_file")"
if [ -z "$api_key" ]; then
  echo "[valuedomain-cleanup] API キーが空です: $api_key_file" >&2
  exit 1
fi
domain="${CERTBOT_DOMAIN:?CERTBOT_DOMAIN が未設定です}"
base_domain="$(awk -F. '{print $(NF-1)"."$NF}' <<< "$domain")"
validation="${CERTBOT_VALIDATION:?CERTBOT_VALIDATION が未設定です}"
api_endpoint="https://api.value-domain.com/v1/domains/${base_domain}/dns"

request_api() {
  local method="$1"
  local payload="${2:-}"
  local response
  local http_code
  local body
  local curl_config
  curl_config="$(mktemp)"
  trap 'rm -f "$curl_config"' RETURN
  cat > "$curl_config" <<EOF
header = "Authorization: Bearer ${api_key}"
EOF
  chmod 600 "$curl_config"
  if [ -n "$payload" ]; then
    response="$(curl -sS -w '\n%{http_code}' -X "$method" -K "$curl_config" \
      -H "Content-Type: application/json" -d "$payload" "$api_endpoint")" || {
      echo "[valuedomain-cleanup] DNS レコード更新 API 呼び出し (${method}) に失敗しました" >&2
      exit 1
    }
  else
    response="$(curl -sS -w '\n%{http_code}' -X "$method" -K "$curl_config" \
      "$api_endpoint")" || {
      echo "[valuedomain-cleanup] DNS レコード取得 API 呼び出し (${method}) に失敗しました" >&2
      exit 1
    }
  fi
  http_code="$(printf '%s\n' "$response" | tail -n1)"
  body="$(printf '%s\n' "$response" | sed '$d')"
  if [ "$http_code" -ge 400 ]; then
    echo "[valuedomain-cleanup] HTTP エラー (${method}): $http_code" >&2
    printf '%s\n' "$body" >&2
    exit 1
  fi
  printf '%s' "$body"
}

response="$(request_api GET)"
export VD_RESPONSE="$response"
ns_type="$(python3 - <<'PY'
import json, os, sys
response = os.environ.get("VD_RESPONSE", "")
if not response:
    print("[valuedomain-cleanup] API レスポンスが空です", file=sys.stderr)
    sys.exit(1)
try:
    data = json.loads(response)
except json.JSONDecodeError as e:
    print(f"[valuedomain-cleanup] JSON デコードに失敗しました: {e}", file=sys.stderr)
    sys.exit(1)
try:
    ns_type = data["results"]["ns_type"]
except (KeyError, TypeError) as e:
    print(f"[valuedomain-cleanup] API レスポンスの形式が想定外です: {e}", file=sys.stderr)
    sys.exit(1)
print(ns_type)
PY
)"
records="$(python3 - <<'PY'
import json, os, sys
response = os.environ.get("VD_RESPONSE", "")
if not response:
    print("[valuedomain-cleanup] API レスポンスが空です", file=sys.stderr)
    sys.exit(1)
try:
    data = json.loads(response)
except json.JSONDecodeError as e:
    print(f"[valuedomain-cleanup] JSON デコードに失敗しました: {e}", file=sys.stderr)
    sys.exit(1)
try:
    records = data["results"]["records"]
except (KeyError, TypeError) as e:
    print(f"[valuedomain-cleanup] API レスポンスの形式が想定外です: {e}", file=sys.stderr)
    sys.exit(1)
print(records)
PY
)"

export VD_RECORDS="$records"
export VD_DOMAIN="$domain"
export VD_BASE_DOMAIN="$base_domain"
record_name="$(python3 - <<'PY'
import os, sys
domain = os.environ["VD_DOMAIN"]
base_domain = os.environ["VD_BASE_DOMAIN"]
if domain == base_domain:
    name = "_acme-challenge"
elif domain.endswith("." + base_domain):
    host = domain[: -(len(base_domain) + 1)]
    name = f"_acme-challenge.{host}"
else:
    print("[valuedomain-cleanup] base_domain の判定に失敗しました", file=sys.stderr)
    sys.exit(1)
print(name)
PY
)"
updated_records="$(python3 - <<'PY'
import os
records=os.environ.get("VD_RECORDS","")
validation=os.environ["CERTBOT_VALIDATION"]
record_name=os.environ["VD_RECORD_NAME"]
line=f"txt {record_name} {validation}"
lines=[l for l in records.splitlines() if l.strip() and l.strip()!=line]
print("\n".join(lines))
PY
)"

export UPDATED_RECORDS="$updated_records"
export VD_RECORD_NAME="$record_name"
export VD_NS_TYPE="$ns_type"
payload="$(python3 - <<'PY'
import json, os
records=os.environ["UPDATED_RECORDS"]
ns_type=os.environ["VD_NS_TYPE"]
print(json.dumps({"ns_type":ns_type,"records":records,"ttl":"3600"}))
PY
)"

request_api PUT "$payload" >/dev/null
HOOK

chmod +x "$hook_base/valuedomain-auth.sh" "$hook_base/valuedomain-cleanup.sh"

domain_args=(-d "$ACME_DOMAIN")
if [ -n "${ACME_EXTRA_DOMAINS:-}" ]; then
  read -r -a extra_domains <<< "$ACME_EXTRA_DOMAINS"
  for extra_domain in "${extra_domains[@]}"; do
    if [ -n "$extra_domain" ]; then
      domain_args+=(-d "$extra_domain")
    fi
  done
fi

cert_path="/etc/letsencrypt/live/${ACME_DOMAIN}/fullchain.pem"
if [ -f "$cert_path" ]; then
  echo "[20-certbot] 証明書は既に存在します。"
else
  if ! certbot certonly --manual --preferred-challenges dns \
    --manual-auth-hook "$hook_base/valuedomain-auth.sh" \
    --manual-cleanup-hook "$hook_base/valuedomain-cleanup.sh" \
    --manual-public-ip-logging-ok \
    --non-interactive --agree-tos -m "$ACME_EMAIL" \
    "${domain_args[@]}"; then
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

certbot_timer="$(systemctl list-timers --no-legend | awk '$1 ~ /certbot.*\\.timer|snap\\.certbot.*\\.timer/ {print $1; exit}')"
if [ -z "$certbot_timer" ]; then
  echo "[20-certbot] certbot 用の systemd timer が見つかりません。list-timers で確認してください。" >&2
  exit 1
fi
systemctl enable --now "$certbot_timer"
