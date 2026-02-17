#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[deploy] root 権限で実行してください。" >&2
  exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/../shared.sh"

: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"
: "${APP_BRANCH:?APP_BRANCH が未設定です}"
: "${APP_REPO_URL:?APP_REPO_URL が未設定です}"
: "${GITHUB_APP_ID:?GITHUB_APP_ID が未設定です}"
: "${GITHUB_INSTALLATION_ID:?GITHUB_INSTALLATION_ID が未設定です}"
: "${GITHUB_APP_PEM_PATH:?GITHUB_APP_PEM_PATH が未設定です}"
: "${MYSQL_APP_DB:?MYSQL_APP_DB が未設定です}"
: "${MYSQL_APP_USER:?MYSQL_APP_USER が未設定です}"
: "${MYSQL_APP_PASSWORD:?MYSQL_APP_PASSWORD が未設定です}"
: "${MYSQL_BIND_ADDRESS:?MYSQL_BIND_ADDRESS が未設定です}"

if [[ "$APP_REPO_URL" != https://* ]]; then
  echo "[deploy] APP_REPO_URL は HTTPS 形式で指定してください。" >&2
  exit 1
fi
if [ ! -f "$GITHUB_APP_PEM_PATH" ]; then
  echo "[deploy] GITHUB_APP_PEM_PATH が見つかりません: $GITHUB_APP_PEM_PATH" >&2
  exit 1
fi

for cmd in curl jq openssl git; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "[deploy] 必要コマンドが見つかりません: $cmd" >&2
    exit 1
  fi
done

DATABASE_URL_VALUE="$(build_database_url)"

JWT_IAT_OFFSET=60
JWT_EXP_DURATION=540

now=$(date +%s)
iat=$((now - JWT_IAT_OFFSET))
exp=$((now + JWT_EXP_DURATION))

# JWT 用の base64url エンコード
b64url() { openssl base64 -e -A | tr '+/' '-_' | tr -d '='; }

header=$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)
payload=$(printf '{"iat":%d,"exp":%d,"iss":"%s"}' "$iat" "$exp" "$GITHUB_APP_ID" | b64url)
unsigned="${header}.${payload}"
signature=$(printf '%s' "$unsigned" | openssl dgst -sha256 -sign "$GITHUB_APP_PEM_PATH" | b64url)
jwt="${unsigned}.${signature}"

token_response_file=$(mktemp)
askpass_script=$(mktemp)
token_file=$(mktemp)
trap 'rm -f "$askpass_script" "$token_file" "$token_response_file"' EXIT

if ! token_status=$(curl -sS -o "$token_response_file" -w '%{http_code}' -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${jwt}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/app/installations/${GITHUB_INSTALLATION_ID}/access_tokens"); then
  echo "[deploy] GitHub App token の取得に失敗しました（ネットワークエラー）。" >&2
  exit 1
fi

token=$(jq -r .token "$token_response_file")
if [ -z "$token" ] || [ "$token" = "null" ] || [ "$token_status" -lt 200 ] || [ "$token_status" -ge 300 ]; then
  error_message=$(jq -r '.message // empty' "$token_response_file")
  echo "[deploy] GitHub App token の取得に失敗しました。HTTP ${token_status}${error_message:+ ($error_message)}" >&2
  exit 1
fi

printf '%s' "$token" > "$token_file"
chown "$APP_USER":"$APP_USER" "$token_file"
chmod 600 "$token_file"

cat <<'ASKPASS' > "$askpass_script"
#!/usr/bin/env bash
case "$1" in
*Username*) echo "x-access-token" ;;
*Password*) cat "__TOKEN_FILE__" ;;
*) cat "__TOKEN_FILE__" ;;
esac
ASKPASS
sed -i "s|__TOKEN_FILE__|$token_file|" "$askpass_script"
chmod 755 "$askpass_script"

if [ ! -d "$APP_DIR/.git" ]; then
  sudo -u "$APP_USER" -- bash -c "mkdir -p '$APP_DIR'"
  sudo -u "$APP_USER" -- env GIT_ASKPASS="$askpass_script" GIT_TERMINAL_PROMPT=0 \
    git clone "$APP_REPO_URL" "$APP_DIR"
fi

sudo -u "$APP_USER" -- env GIT_ASKPASS="$askpass_script" GIT_TERMINAL_PROMPT=0 \
  git -C "$APP_DIR" fetch --prune origin "$APP_BRANCH"
sudo -u "$APP_USER" -- git -C "$APP_DIR" checkout "$APP_BRANCH"
sudo -u "$APP_USER" -- env GIT_ASKPASS="$askpass_script" GIT_TERMINAL_PROMPT=0 \
  git -C "$APP_DIR" reset --hard "origin/$APP_BRANCH"

sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && npm ci"
sudo -u "$APP_USER" -- bash -c "cd '$APP_DIR' && npm run build"

if [ -f "$APP_DIR/prisma/schema.prisma" ]; then
  sudo -u "$APP_USER" -- env DATABASE_URL="$DATABASE_URL_VALUE" bash -c "cd '$APP_DIR' && npx prisma migrate deploy"
fi

systemctl restart nextjs.service
