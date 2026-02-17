# GitHub App からの初回 Clone ガイド

GitHub App を対象リポジトリにインストールしてから、VPS で初回 clone を実行するまでの手順です。

## GitHub側（準備）

### 1) GitHub App を対象リポジトリに Install

* GitHub → **Settings** → **Developer settings** → **GitHub Apps** →（対象App）→ **Install App**
* インストール先（Org/ユーザー）を選ぶ
* Repository access は **Only select repositories** を選んで対象repoを選択（Allでも可）
* **Install** を実行

### 2) 権限（Permissions）を付与

* App settings → **Permissions & events**
* **Repository permissions → Contents: Read**（最低限）
* 権限を変更した場合：

  * 変更後に **Reinstall / Update permissions**（表示される場合）を実行して反映

### 3) 秘密鍵（PEM）を生成してダウンロード

* App settings → **Private keys** → **Generate a private key**
* `.pem` がダウンロードされる（これが唯一。GitHubは秘密鍵を再表示しない）

### 4) App ID / Installation ID を控える

* **App ID**：App settings の画面に表示されている値を控える
* **Installation ID**：Install App 後に開くインストール画面のURLに含まれる
  例：`.../settings/installations/<ID>` の `<ID>`

---

## VPS側（JWT → Installation Token → clone）

### 5) 必要コマンドの確認（入ってなければ入れる）

* 必要：`git`, `curl`, `openssl`, `jq`

例（Rocky系なら）：

```bash
sudo dnf install -y git curl openssl jq
```

### 6) 秘密鍵（PEM）をVPSに配置

例：

```bash
sudo mkdir -p /opt/secrets
sudo cp ./YOUR_APP_PRIVATE_KEY.pem /opt/secrets/github-app.pem
sudo chmod 600 /opt/secrets/github-app.pem
```

### 7) 環境変数をセット（App ID / Installation ID / PEMパス / リポジトリ）

```bash
export GITHUB_APP_ID="123456"
export GITHUB_INSTALLATION_ID="987654321"
export GITHUB_APP_PEM_PATH="/opt/secrets/github-app.pem"

export OWNER="LevelCapTech"
export REPO="Agile-PMBOK-Assist"
```

### 8) JWT を作る（bash + openssl）

```bash
b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }

now=$(date +%s)
iat=$((now-60))
exp=$((now+540)) # 9分後

header='{"alg":"RS256","typ":"JWT"}'
payload=$(printf '{"iat":%d,"exp":%d,"iss":"%s"}' "$iat" "$exp" "$GITHUB_APP_ID")

h64=$(printf '%s' "$header" | b64url)
p64=$(printf '%s' "$payload" | b64url)
data="${h64}.${p64}"

sig=$(printf '%s' "$data" | openssl dgst -sha256 -sign "$GITHUB_APP_PEM_PATH" | b64url)
export JWT="${data}.${sig}"
```

### 9) JWT で Installation Token を発行（GitHub API）

```bash
export INSTALL_TOKEN="$(
  curl -sS -X POST \
    -H "Authorization: Bearer ${JWT}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/app/installations/${GITHUB_INSTALLATION_ID}/access_tokens" \
  | jq -r .token
)"
```

### 10) Installation Token で HTTPS clone（初回）

```bash
git clone "https://x-access-token:${INSTALL_TOKEN}@github.com/${OWNER}/${REPO}.git"
```
