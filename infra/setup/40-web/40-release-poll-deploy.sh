#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

: "${APP_DIR:=/opt/agile-pmbok-assist_repo}"
: "${RELEASE_ASSET_NAME:=next-bundle.tgz}"
: "${DEPLOY_SERVICE_NAME:=nextjs.service}"
: "${GITHUB_API_BASE_URL:=https://api.github.com}"

STATE_FILE="${APP_DIR}/.last_deployed_tag"
RELEASES_DIR="${APP_DIR}/releases"
CURRENT_LINK="${APP_DIR}/current"
LOCK_FILE="${APP_DIR}/.deploy.lock"

dry_run=false
check_auth=false
rollback_tag=""
lock_fd=""

while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run)
      dry_run=true
      ;;
    --check-auth)
      check_auth=true
      ;;
    --rollback)
      shift
      case "${1:-}" in
        ""|--*)
          echo "[40-release-poll-deploy] --rollback オプションにはタグを指定してください。" >&2
          exit 1
          ;;
      esac
      rollback_tag="$1"
      ;;
    *)
      echo "[40-release-poll-deploy] 未対応オプションです: $1" >&2
      exit 1
      ;;
  esac
  shift
done

if [ -n "$rollback_tag" ] && [ "$check_auth" = true ]; then
  echo "[40-release-poll-deploy] --rollback と --check-auth は同時に指定できません。" >&2
  exit 1
fi

if [ -n "$rollback_tag" ] && [ "$dry_run" = true ]; then
  echo "[40-release-poll-deploy] --rollback と --dry-run は同時に指定できません。" >&2
  exit 1
fi

if [ "$dry_run" = false ] && [ "$(id -u)" -ne 0 ]; then
  echo "[40-release-poll-deploy] root 権限で実行してください。" >&2
  exit 1
fi

if [[ "$APP_DIR" != /* ]]; then
  echo "[40-release-poll-deploy] APP_DIR は絶対パスで指定してください: $APP_DIR" >&2
  exit 1
fi

if [ "$dry_run" = false ]; then
  : "${APP_USER:?APP_USER が未設定です}"
  : "${GITHUB_APP_ID:?GITHUB_APP_ID が未設定です}"
  : "${GITHUB_INSTALLATION_ID:?GITHUB_INSTALLATION_ID が未設定です}"
  : "${GITHUB_APP_PEM_PATH:?GITHUB_APP_PEM_PATH が未設定です}"
  if ! id -u "$APP_USER" >/dev/null 2>&1; then
    echo "[40-release-poll-deploy] APP_USER が存在しません: $APP_USER" >&2
    exit 1
  fi
fi

for name in curl jq openssl tar systemctl flock; do
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "[40-release-poll-deploy] 必要コマンドが見つかりません: $name" >&2
    exit 1
  fi
done

if [ "$dry_run" = false ] && [ ! -f "$GITHUB_APP_PEM_PATH" ]; then
  echo "[40-release-poll-deploy] GITHUB_APP_PEM_PATH が見つかりません: $GITHUB_APP_PEM_PATH" >&2
  exit 1
fi

repo_full="${GITHUB_REPOSITORY:-}"
if [ -z "$repo_full" ]; then
  : "${APP_REPO_URL:?APP_REPO_URL が未設定です}"
  repo_full="$(printf '%s' "$APP_REPO_URL" | sed -E 's#^https://github.com/##; s#\.git$##')"
fi
if ! printf '%s' "$repo_full" | grep -Eq '^[^/]+/[^/]+$'; then
  echo "[40-release-poll-deploy] owner/repo を特定できませんでした: $repo_full" >&2
  exit 1
fi

owner="${repo_full%/*}"
repo="${repo_full#*/}"

log() {
  local level="$1"
  local step="$2"
  local result="$3"
  local message="$4"
  printf '[40-release-poll-deploy] LEVEL=%s STEP=%s RESULT=%s MESSAGE=%s\n' "$level" "$step" "$result" "$message"
}

b64url() {
  openssl base64 -e -A | tr '+/' '-_' | tr -d '='
}

create_installation_token() {
  local now iat exp header payload unsigned sig jwt
  now="$(date +%s)"
  # JWT は時刻同期を前提とするため、NTP/chrony でサーバー時刻を正確に保つこと。
  iat=$((now-60))
  exp=$((now+540))
  header="$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)"
  payload="$(printf '{"iat":%d,"exp":%d,"iss":"%s"}' "$iat" "$exp" "$GITHUB_APP_ID" | b64url)"
  unsigned="${header}.${payload}"
  sig="$(printf '%s' "$unsigned" | openssl dgst -sha256 -sign "$GITHUB_APP_PEM_PATH" | b64url)"
  jwt="${unsigned}.${sig}"
  curl -fsS -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${jwt}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "${GITHUB_API_BASE_URL}/app/installations/${GITHUB_INSTALLATION_ID}/access_tokens" \
    | jq -r '.token'
}

switch_current_link() {
  local target_dir="$1"
  local link_next="${CURRENT_LINK}.next"
  rm -f "$link_next"
  ln -sfn "$target_dir" "$link_next"
  mv -Tf "$link_next" "$CURRENT_LINK"
}

restart_service() {
  systemctl restart "$DEPLOY_SERVICE_NAME"
  systemctl is-active --quiet "$DEPLOY_SERVICE_NAME"
}

validate_archive_paths() {
  local archive_path="$1"
  local entry
  while IFS= read -r entry; do
    [ -z "$entry" ] && continue
    case "$entry" in
      /*|..|../*|*/../*|*/..)
        log "ERROR" "archive-validate" "failed" "危険なパスが含まれています: ${entry}"
        return 1
        ;;
    esac
  done < <(tar -tzf "$archive_path")
  return 0
}

validate_archive_links() {
  local archive_path="$1"
  local tar_list
  if ! tar_list="$(tar -tvzf "$archive_path")"; then
    log "ERROR" "archive-validate" "failed" "アーカイブの検査に失敗しました: ${archive_path}"
    return 1
  fi
  if printf '%s\n' "$tar_list" | grep -E -q '^[lh]'; then
    log "ERROR" "archive-validate" "failed" "symlink / hardlink を含むため拒否します"
    return 1
  fi
  return 0
}

rollback_to_tag() {
  local tag="$1"
  local target_dir="${RELEASES_DIR}/${tag}"
  if [ ! -d "$target_dir" ] || [ ! -f "${target_dir}/.deploy-complete" ]; then
    log "ERROR" "rollback" "failed" "指定された tag が存在しません: ${tag}"
    exit 1
  fi
  switch_current_link "$target_dir"
  if ! restart_service; then
    log "ERROR" "rollback-restart" "failed" "サービス再起動に失敗しました"
    exit 1
  fi
  printf '%s\n' "$tag" > "$STATE_FILE"
  log "INFO" "rollback" "success" "tag=${tag}"
}

if [ "$dry_run" = true ]; then
  log "INFO" "dry-run" "success" "repo=${owner}/${repo} asset=${RELEASE_ASSET_NAME}"
  exit 0
fi

if [ ! -d "$APP_DIR" ]; then
  install -d -m 755 -o "$APP_USER" -g "$APP_USER" "$APP_DIR"
fi
mkdir -p "$RELEASES_DIR"

exec {lock_fd}>"$LOCK_FILE"
cleanup_lock() {
  if [ -n "${lock_fd:-}" ]; then
    exec {lock_fd}>&- || true
  fi
}
trap cleanup_lock EXIT INT TERM
if ! flock -n "$lock_fd"; then
  log "ERROR" "lock" "failed" "別の deploy 処理が実行中です"
  exit 1
fi

if [ -n "$rollback_tag" ]; then
  # rollback も lock 取得後にのみ実行し、timer 実行との競合を防ぐ。
  rollback_to_tag "$rollback_tag"
  exit 0
fi

# token は短命利用のみとし、ログや引数へ出力しない。
token="$(create_installation_token)"
if [ -z "$token" ] || [ "$token" = "null" ]; then
  log "ERROR" "auth" "failed" "installation token 取得に失敗しました"
  exit 1
fi

if [ "$check_auth" = true ]; then
  log "INFO" "auth" "success" "GitHub App 認証に成功しました"
  exit 0
fi

release_json="$(
  curl -fsS \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: token ${token}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/releases/latest"
)"

release_tag="$(printf '%s' "$release_json" | jq -r '.tag_name')"
asset_id="$(printf '%s' "$release_json" | jq -r --arg name "$RELEASE_ASSET_NAME" '.assets[] | select(.name == $name) | .id' | head -n 1)"

if [ -z "$release_tag" ] || [ "$release_tag" = "null" ]; then
  log "ERROR" "latest-release" "failed" "latest release が取得できませんでした"
  exit 1
fi
if [ -z "$asset_id" ] || [ "$asset_id" = "null" ]; then
  log "ERROR" "latest-release" "failed" "asset ${RELEASE_ASSET_NAME} が見つかりません"
  exit 1
fi

target_dir="${RELEASES_DIR}/${release_tag}"
target_complete_file="${target_dir}/.deploy-complete"
current_target=""
if [ -L "$CURRENT_LINK" ]; then
  current_target="$(readlink -f "$CURRENT_LINK" || true)"
fi

if [ -f "$target_complete_file" ] && [ "$current_target" = "$target_dir" ]; then
  printf '%s\n' "$release_tag" > "$STATE_FILE"
  log "INFO" "idempotent" "success" "tag=${release_tag} は既にデプロイ済みです"
  exit 0
fi

tmp_dir="$(mktemp -d)"
cleanup_all() {
  # 既存の lock 用クリーンアップが定義されていれば必ず呼び出す
  if declare -F cleanup_lock >/dev/null 2>&1; then
    cleanup_lock
  fi

  # 一時ディレクトリを安全に削除
  if [ -n "${tmp_dir:-}" ] && [ -d "$tmp_dir" ]; then
    rm -rf "$tmp_dir"
  fi
}
# 以下の trap 定義で以前の trap を cleanup_all に上書きし、lock と tmp_dir の後片付けを集約する。
trap 'cleanup_all' EXIT INT TERM

if [ ! -f "$target_complete_file" ]; then
  archive_path="${tmp_dir}/${RELEASE_ASSET_NAME}"
  curl -fsSL \
    -H "Accept: application/octet-stream" \
    -H "Authorization: token ${token}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/releases/assets/${asset_id}" \
    -o "$archive_path"

  if [ ! -s "$archive_path" ]; then
    log "ERROR" "download" "failed" "アセットのダウンロードに失敗しました: path=${archive_path}"
    exit 1
  fi
  validate_archive_paths "$archive_path" || exit 1
  validate_archive_links "$archive_path" || exit 1

  staging_dir="${target_dir}.deploying"
  rm -rf "$staging_dir"
  mkdir -p "$staging_dir"
  tar --no-same-owner --no-same-permissions -xzf "$archive_path" -C "$staging_dir"
  touch "${staging_dir}/.deploy-complete"
  chown -R "$APP_USER":"$APP_USER" "$staging_dir" || {
    log "ERROR" "ownership" "failed" "所有権変更に失敗しました: ${staging_dir}"
    rm -rf "$staging_dir"
    exit 1
  }
  rm -rf "$target_dir"
  mv "$staging_dir" "$target_dir"
else
  # 展開済み tag への再切替ケースでは、展開処理を省略して current 切替と restart のみ行う。
  log "INFO" "deploy" "success" "tag=${release_tag} は展開済みのため切替のみ実施します"
fi

previous_target="$current_target"
switch_current_link "$target_dir"

if ! restart_service; then
  if [ -n "$previous_target" ] && [ -d "$previous_target" ]; then
    switch_current_link "$previous_target"
    if systemctl restart "$DEPLOY_SERVICE_NAME" && systemctl is-active --quiet "$DEPLOY_SERVICE_NAME"; then
      log "ERROR" "restart" "failed" "サービス再起動に失敗したため current をロールバックし、旧リリースで復旧しました"
    else
      log "ERROR" "restart" "failed" "current はロールバックしましたが、サービスは停止状態です"
    fi
  else
    # 初回デプロイなど、ロールバック先がない場合は current シンボリックリンクを削除して安全な状態に戻す
    if [ -L "$CURRENT_LINK" ] || [ -e "$CURRENT_LINK" ]; then
      rm -f "$CURRENT_LINK"
    fi
    log "ERROR" "restart" "failed" "サービス再起動に失敗したため current を削除しました"
  fi
  exit 1
fi

tmp_state_file="${STATE_FILE}.tmp"
if ! printf '%s\n' "$release_tag" > "$tmp_state_file"; then
  log "ERROR" "state-file" "write_failed" "STATE_FILE への書き込みに失敗しました: ${tmp_state_file}"
  exit 1
fi
written_tag="$(cat "$tmp_state_file" 2>/dev/null || true)"
if [ "$written_tag" != "$release_tag" ]; then
  log "ERROR" "state-file" "verify_failed" "STATE_FILE の内容検証に失敗しました: expected=${release_tag} actual=${written_tag:-<empty>}"
  rm -f "$tmp_state_file"
  exit 1
fi
mv "$tmp_state_file" "$STATE_FILE"
log "INFO" "deploy" "success" "tag=${release_tag}"
