# GitHub App からの初回 Clone ガイド

GitHub App を対象リポジトリにインストールしてから、VPS で初回 clone を実行するまでの手順です。
詳細な infra 全体の運用は [README.md](README.md) を参照してください。

## 1. GitHub App を対象リポジトリに Install

1. GitHub の「Developer settings」から GitHub App を作成する。
2. Permissions は **Contents: Read-only** を付与する。
3. App を対象リポジトリにインストールする（Only select repositories で対象 repo を選択）。
4. App の設定画面で **App ID** を控える。
5. Install 画面の URL 末尾から **Installation ID** を控える。
6. 「Generate a private key」で PEM を発行し、VPS に配置する（GitHub にはアップロードしない）。

## 2. VPS に PEM を配置

```bash
sudo install -d -m 700 /etc/agile-pmbok-assist
sudo install -m 600 ~/Downloads/agile-pmbok-assist-app.pem /etc/agile-pmbok-assist/github-app.pem
sudo chown root:root /etc/agile-pmbok-assist/github-app.pem
```

## 3. infra/.env に GitHub App 情報を設定

`infra/.env.sample` を `infra/.env` にコピーし、以下を設定します。

```bash
GITHUB_APP_ID=123456
GITHUB_INSTALLATION_ID=12345678
GITHUB_APP_PEM_PATH=/etc/agile-pmbok-assist/github-app.pem
APP_REPO_URL=https://github.com/example/agile-pmbok-assist.git
APP_BRANCH=main
APP_DIR=/opt/agile-pmbok-assist_repo
APP_USER=appuser
```

## 4. 初回 Clone を実行

1. bootstrap を実行して systemd を配置する。

```bash
sudo bash infra/bootstrap.sh
```

2. 初回 pull（clone）を実行する。

```bash
sudo systemctl start agile-pmbok-assist-pull.service
```

3. clone の結果を確認する。

```bash
sudo -u appuser -- git -C /opt/agile-pmbok-assist_repo status
```

## 5. 補足

- `agile-pmbok-assist-pull.service` は `reset --hard` で同期するため、ローカル変更は破棄されます。
- 監視間隔の変更や停止は `agile-pmbok-assist-pull.timer` を管理してください。
