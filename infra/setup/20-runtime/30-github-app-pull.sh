#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[30-github-app-pull] root 権限で実行してください。" >&2
  exit 1
fi

: "${GITHUB_APP_ID:?GITHUB_APP_ID が未設定です}"
: "${GITHUB_INSTALLATION_ID:?GITHUB_INSTALLATION_ID が未設定です}"
: "${GITHUB_APP_PEM_PATH:?GITHUB_APP_PEM_PATH が未設定です}"
: "${APP_REPO_URL:?APP_REPO_URL が未設定です}"
: "${APP_BRANCH:?APP_BRANCH が未設定です}"
: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"

if [ ! -f "$GITHUB_APP_PEM_PATH" ]; then
  echo "[30-github-app-pull] GITHUB_APP_PEM_PATH が見つかりません: $GITHUB_APP_PEM_PATH" >&2
  exit 1
fi
pem_perm="$(stat -c '%a' "$GITHUB_APP_PEM_PATH" 2>/dev/null || true)"
if ! printf '%s' "$pem_perm" | grep -Eq '^(400|600)$'; then
  echo "[30-github-app-pull] GITHUB_APP_PEM_PATH のパーミッションを 600 または 400 にしてください: ${pem_perm:-unknown}" >&2
  exit 1
fi
if ! id -u "$APP_USER" >/dev/null 2>&1; then
  echo "[30-github-app-pull] APP_USER が存在しません。先にユーザーを作成してください。" >&2
  exit 1
fi
if [[ "$APP_DIR" != /* ]]; then
  echo "[30-github-app-pull] APP_DIR は絶対パスで指定してください。" >&2
  exit 1
fi
if [[ "$APP_REPO_URL" != https://* ]]; then
  echo "[30-github-app-pull] APP_REPO_URL は HTTPS 形式で指定してください: $APP_REPO_URL" >&2
  exit 1
fi

for name in curl jq git openssl sudo; do
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "[30-github-app-pull] 必要コマンドが見つかりません: $name" >&2
    exit 1
  fi
done

pull_script="/usr/local/bin/agile-pmbok-assist-githubapp-pull.sh"
cat <<'SCRIPT' > "$pull_script"
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

if [ "$(id -u)" -ne 0 ]; then
  echo "[githubapp-pull] root 権限で実行してください。" >&2
  exit 1
fi

: "${GITHUB_APP_ID:?GITHUB_APP_ID が未設定です}"
: "${GITHUB_INSTALLATION_ID:?GITHUB_INSTALLATION_ID が未設定です}"
: "${GITHUB_APP_PEM_PATH:?GITHUB_APP_PEM_PATH が未設定です}"
: "${APP_REPO_URL:?APP_REPO_URL が未設定です}"
: "${APP_BRANCH:?APP_BRANCH が未設定です}"
: "${APP_DIR:?APP_DIR が未設定です}"
: "${APP_USER:?APP_USER が未設定です}"

if [ ! -f "$GITHUB_APP_PEM_PATH" ]; then
  echo "[githubapp-pull] GITHUB_APP_PEM_PATH が見つかりません: $GITHUB_APP_PEM_PATH" >&2
  exit 1
fi
pem_perm="$(stat -c '%a' "$GITHUB_APP_PEM_PATH" 2>/dev/null || true)"
if ! printf '%s' "$pem_perm" | grep -Eq '^(400|600)$'; then
  echo "[githubapp-pull] GITHUB_APP_PEM_PATH のパーミッションを 600 または 400 にしてください: ${pem_perm:-unknown}" >&2
  exit 1
fi
if ! id -u "$APP_USER" >/dev/null 2>&1; then
  echo "[githubapp-pull] APP_USER が存在しません。先にユーザーを作成してください。" >&2
  exit 1
fi
if [[ "$APP_DIR" != /* ]]; then
  echo "[githubapp-pull] APP_DIR は絶対パスで指定してください。" >&2
  exit 1
fi
if [[ "$APP_REPO_URL" != https://* ]]; then
  echo "[githubapp-pull] APP_REPO_URL は HTTPS 形式で指定してください: $APP_REPO_URL" >&2
  exit 1
fi

need() { command -v "$1" >/dev/null 2>&1 || { echo "[githubapp-pull] 必要コマンドが見つかりません: $1" >&2; exit 1; }; }
need openssl
need curl
need jq
need git
need sudo

b64url() { openssl base64 -e -A | tr '+/' '-_' | tr -d '='; }

CLOCK_SKEW_TOLERANCE_SECONDS=60
JWT_EXPIRY_SECONDS=540 # 約9分

now="$(date +%s)"
# CLOCK_SKEW_TOLERANCE_SECONDS の秒数ぶん時計ずれを吸収し、JWT の有効期限は約9分にする。
iat=$((now-CLOCK_SKEW_TOLERANCE_SECONDS))
exp=$((now+JWT_EXPIRY_SECONDS))

header="$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)"
payload="$(printf '{"iat":%d,"exp":%d,"iss":"%s"}' "$iat" "$exp" "$GITHUB_APP_ID" | b64url)"
unsigned="${header}.${payload}"
sig="$(printf '%s' "$unsigned" | openssl dgst -sha256 -sign "$GITHUB_APP_PEM_PATH" | b64url)"
jwt="${unsigned}.${sig}"

token="$(
  curl -fsS -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${jwt}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/app/installations/${GITHUB_INSTALLATION_ID}/access_tokens" \
  | jq -r .token
)"

if [ -z "$token" ] || [ "$token" = "null" ]; then
  echo "[githubapp-pull] GitHub App token の取得に失敗しました。" >&2
  exit 1
fi

basic="$(printf 'x-access-token:%s' "$token" | openssl base64 -A)"

tmp_dir="$(mktemp -d)"
chmod 700 "$tmp_dir"
cleanup() { rm -rf "$tmp_dir"; }
trap cleanup EXIT
chown "$APP_USER":"$APP_USER" "$tmp_dir"

git_config="${tmp_dir}/git-config"
cat <<EOF > "$git_config"
[http]
  extraHeader = Authorization: Basic ${basic}
EOF
chown "$APP_USER":"$APP_USER" "$git_config"
chmod 600 "$git_config"
unset token basic
# unset はベストエフォートのため、詳細は infra/README.md の注意事項を参照する。

if [ ! -d "$APP_DIR/.git" ]; then
  mkdir -p "$APP_DIR"
  chown "$APP_USER":"$APP_USER" "$APP_DIR"
  sudo -u "$APP_USER" -- git -c "include.path=$git_config" clone "$APP_REPO_URL" "$APP_DIR"
fi

echo "[githubapp-pull] reset --hard で最新のコミットへ合わせます（ローカル変更は破棄されます）。" >&2
sudo -u "$APP_USER" -- git -C "$APP_DIR" -c "include.path=$git_config" fetch origin "$APP_BRANCH"
sudo -u "$APP_USER" -- git -C "$APP_DIR" reset --hard "origin/$APP_BRANCH"
SCRIPT

chmod 750 "$pull_script"

pull_env_dir="/etc/agile-pmbok-assist"
pull_env_file="${pull_env_dir}/pull.env"
install -d -m 700 "$pull_env_dir"
cat <<ENV > "$pull_env_file"
GITHUB_APP_ID=${GITHUB_APP_ID}
GITHUB_INSTALLATION_ID=${GITHUB_INSTALLATION_ID}
GITHUB_APP_PEM_PATH=${GITHUB_APP_PEM_PATH}
APP_REPO_URL=${APP_REPO_URL}
APP_BRANCH=${APP_BRANCH}
APP_DIR=${APP_DIR}
APP_USER=${APP_USER}
ENV
chmod 600 "$pull_env_file"

service_file="/etc/systemd/system/agile-pmbok-assist-pull.service"
if [ -f "$service_file" ]; then
  cp "$service_file" "${service_file}.bak.$(date +%s)"
fi
cat <<SERVICE > "$service_file"
[Unit]
Description=Pull agile-pmbok-assist from GitHub using GitHub App token
Wants=network-online.target
After=network-online.target

[Service]
Type=oneshot
User=root
EnvironmentFile=${pull_env_file}
ExecStart=${pull_script}
SERVICE

timer_file="/etc/systemd/system/agile-pmbok-assist-pull.timer"
if [ -f "$timer_file" ]; then
  cp "$timer_file" "${timer_file}.bak.$(date +%s)"
fi
cat <<TIMER > "$timer_file"
[Unit]
Description=Periodic pull for agile-pmbok-assist

[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
Persistent=true

[Install]
WantedBy=timers.target
TIMER

systemctl daemon-reload
systemctl enable --now agile-pmbok-assist-pull.timer
