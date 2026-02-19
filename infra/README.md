# 初回インフラ整備（VPS）

本ディレクトリは、さくらVPS（Ubuntu 22.04 LTS）で SSR Next.js を動かすための初回整備スクリプトです。Docker は使わず、systemd と Nginx を前提に構成します。

## 前提条件

- Ubuntu 22.04 LTS
- sudo 権限を持つユーザーで作業すること（root 直ログインは禁止）
- 事前に SSH 公開鍵を登録済みであること
- 公開ポートは 443/TCP のみ（SSH は SSH_ALLOW_IPS 指定時はその IP のみに限定）
- ソース配置は `/opt/agile-pmbok-assist_repo`、アプリ環境変数は `/opt/agile-pmbok-assist_repo/app.env` を想定します。
- `app.env` の `PORT` は `APP_PORT` と同じ値にしてください。
- GitHub App の Installation Token で HTTPS pull するため、`setup/20-runtime/30-github-app-pull.sh` が pull スクリプトと systemd timer を配置します。
- GitHub App の設定手順は GitHub 公式ドキュメントを参照し、App ID / Installation ID / PEM を事前に用意してください。
- SSH_ALLOW_IPS を指定した場合は、その IP のみに SSH を許可します（未指定の場合は全 IP 許可）。
- infra 配下のシェルスクリプトは bash に統一し、shebang は `#!/usr/bin/env bash` を使用します。

## 使い方（概要）

1. `infra/.env.sample` を `infra/.env` にコピーし、実値に更新する
2. `infra/bootstrap.sh` を実行する
3. `systemctl start agile-pmbok-assist-pull.service` で初回 pull を実行する
4. `infra/setup/40-web/deploy.sh` を実行する
5. `infra/setup/90-verify/10-healthcheck.sh` で起動確認する

GitHub App からの初回 clone 手順は [CLONE_GUIDE.md](CLONE_GUIDE.md) を参照してください。

```bash
cp infra/.env.sample infra/.env
chmod 600 infra/.env
sudo bash infra/bootstrap.sh
sudo bash infra/setup/90-verify/10-healthcheck.sh
```

## 注意事項

- `.env` には MySQL/SMTP などの機密情報が含まれるため、Git 管理外にしてください。
- Nginx は 443 のみ公開し、80 は閉じたままです（Certbot は DNS-01 を利用）。
- SSE/ストリーミングは `/api/stream/`、WebSocket は `/ws/` を例に Nginx 設定を用意しています（必要に応じてパスを変更してください）。
- DNS-01 は ValueDomain の API キーを利用した manual hook 方式です（`CERTBOT_DNS_PLUGIN=manual`）。
- `CERTBOT_DNS_CREDENTIALS` に ValueDomain API キーを 1 行で保存し、権限は `600` を付与してください。
- DNS 伝播待ち時間は `CERTBOT_DNS_PROPAGATION_SECONDS` で調整できます（デフォルト 60 秒）。
- `/metrics` は `METRICS_ALLOW_IPS` で指定した監視サーバーの IP のみ許可します（未指定の場合は全 IP 許可のため明示指定を推奨）。
- MySQL は `MYSQL_BIND_ADDRESS` に VPN 側 IP を指定し、general_log は OFF（必要時のみ ON）で運用します。
- `app.env` に DATABASE_URL を指定しない場合は、`MYSQL_*` から自動生成される値を利用します。
- SSH は SSH_ALLOW_IPS 指定時は許可 IP のみに制限し、未指定の場合は全 IP 許可の構成です。
- fail2ban と鍵認証を前提に運用し、ブロック状況の監視を必須としてください（`setup/10-security/30-fail2ban.sh`、`setup/10-security/10-ssh.sh` を参照）。
- `10-ssh.sh` は初期設定済み（PermitRootLogin no 前提）の確認のみ実行します（PubkeyAuthentication yes を検証）。
- GitHub App の Installation Token を使って HTTPS で pull します。`GITHUB_APP_ID`、`GITHUB_INSTALLATION_ID`、`GITHUB_APP_PEM_PATH` を `.env` に設定し、`APP_REPO_URL` は HTTPS 形式にしてください。
- `agile-pmbok-assist-pull.timer` は 5 分間隔で pull します。不要な場合は `systemctl disable --now agile-pmbok-assist-pull.timer` で停止してください。
- GitHub App の短命トークンはメモリ上の残留を完全には防げないため、高セキュリティ環境では tmpfs 配置やメモリ保護ツールの導入を検討してください。

## ディレクトリ構成

```text
infra/
├── README.md
├── bootstrap.sh
├── .env.sample
├── .env
└── setup/
    ├── 00-base/
    ├── 10-security/
    ├── 20-runtime/
    ├── 30-db/
    ├── 40-web/
    ├── 50-monitoring/
    ├── 60-mail/
    └── 90-verify/
```

## DNS-01（ValueDomain）準備

- ValueDomain 側で DNS API を有効化し、API キーを発行する。
- `CERTBOT_DNS_CREDENTIALS` で指定したファイルに API キーを 1 行で保存する。
- API キーファイルは `chmod 600` で権限を制限する。
- ワイルドカードや追加 SAN が必要な場合は `ACME_EXTRA_DOMAINS` にスペース区切りで設定する。

```bash
echo "your-api-key-here" | sudo install -m 600 /dev/stdin /etc/letsencrypt/valuedomain-apikey.txt
# または
sudo install -m 600 /dev/null /etc/letsencrypt/valuedomain-apikey.txt
sudo nano /etc/letsencrypt/valuedomain-apikey.txt
```

## 運用確認

- 80/TCP が閉塞されていること（ファイアウォールおよび Nginx 設定で `listen 80` がないこと）を確認する。
- SSE は `curl -N https://example.com/api/stream/...` で逐次出力されることを確認する。
- WebSocket は `wscat -c wss://example.com/ws/` 等で Upgrade が成立することを確認する。
- 証明書更新は `certbot renew --dry-run` で DNS-01 が自動実行できることを確認する。

```bash
ss -ltnp | grep -E ":80\\s"
curl -N https://example.com/api/stream/...
wscat -c wss://example.com/ws/
certbot renew --dry-run
```

## 再実行について

各スクリプトは冪等性を意識して設計しています。設定が既に存在する場合は上書き前にバックアップを作成し、必要な箇所のみ更新します。

## 参考

- 証明書取得: `infra/setup/40-web/20-certbot.sh`
- Next.js systemd: `infra/setup/40-web/30-nextjs-service.sh`
- Exporter 設定: `infra/setup/50-monitoring/10-exporters.sh`
