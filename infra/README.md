# 初回インフラ整備（VPS）

本ディレクトリは、さくらVPS（Ubuntu 22.04 LTS）で SSR Next.js を動かすための初回整備スクリプトです。Docker は使わず、systemd と Nginx を前提に構成します。

## 前提条件

- Ubuntu 22.04 LTS
- sudo 権限を持つユーザーで作業すること（root 直ログインは禁止）
- 事前に SSH 公開鍵を登録済みであること
- 公開ポートは 443/TCP のみ（SSH は SSH_ALLOW_IPS 指定時はその IP のみに限定）
- ソース配置は `/opt/agile-pmbok-assist_repo`、アプリ環境変数は `/opt/agile-pmbok-assist_repo/app.env` を想定します。
- `app.env` の `PORT` は `APP_PORT` と同じ値にしてください。
- GitHub App での pull 自動化は別途構築済み前提で、`deploy.sh` はビルドと再起動のみ実行します。
- GitHub App の設定手順は GitHub 公式ドキュメントを参照してください（App ID/Installation ID/PEM の取得が必要です）。
- SSH_ALLOW_IPS を指定した場合は、その IP のみに SSH を許可します（未指定の場合は全 IP 許可）。

## 使い方（概要）

1. `infra/.env.sample` を `infra/.env` にコピーし、実値に更新する
2. `infra/bootstrap.sh` を実行する
3. `infra/setup/90-verify/10-healthcheck.sh` で起動確認する

```bash
cp infra/.env.sample infra/.env
chmod 600 infra/.env
sudo bash infra/bootstrap.sh
sudo bash infra/setup/90-verify/10-healthcheck.sh
```

## 注意事項

- `.env` には MySQL/SMTP などの機密情報が含まれるため、Git 管理外にしてください。
- Nginx は 443 のみ公開し、80 は閉じたままです（TLS-ALPN-01 を使用）。
- `/metrics` は `METRICS_ALLOW_IPS` で指定した監視サーバーの IP のみ許可します（未指定の場合は全 IP 許可のため明示指定を推奨）。
- MySQL は `MYSQL_BIND_ADDRESS` に VPN 側 IP を指定し、general_log は OFF（必要時のみ ON）で運用します。
- `app.env` に DATABASE_URL を指定しない場合は、`MYSQL_*` から自動生成される値を利用します。
- SSH は全 IP 許可のため、IP 制限が使えない環境向けの構成です。
- fail2ban と鍵認証を前提に運用し、ブロック状況の監視を必須としてください（`setup/10-security/30-fail2ban.sh`、`setup/10-security/10-ssh.sh` を参照）。
- `10-ssh.sh` は初期設定済み（PermitRootLogin no 前提）の確認のみ実行します（PubkeyAuthentication yes を検証）。
- GitHub App の Installation Token を使って HTTPS で pull します。`GITHUB_APP_ID`、`GITHUB_INSTALLATION_ID`、`GITHUB_APP_PEM_PATH` を `.env` に設定し、`APP_REPO_URL` は HTTPS 形式にしてください。

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

## 再実行について

各スクリプトは冪等性を意識して設計しています。設定が既に存在する場合は上書き前にバックアップを作成し、必要な箇所のみ更新します。

## 参考

- 証明書取得: `infra/setup/40-web/20-certbot.sh`
- Next.js systemd: `infra/setup/40-web/30-nextjs-service.sh`
- Exporter 設定: `infra/setup/50-monitoring/10-exporters.sh`
