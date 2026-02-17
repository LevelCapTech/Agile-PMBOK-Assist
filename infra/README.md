# 初回インフラ整備（VPS）

本ディレクトリは、さくらVPS（Ubuntu 22.04 LTS）で SSR Next.js を動かすための初回整備スクリプトです。Docker は使わず、systemd と Nginx を前提に構成します。

## 前提条件

- Ubuntu 22.04 LTS
- sudo 権限を持つユーザーで作業すること（root 直ログインは禁止）
- 事前に SSH 公開鍵を登録済みであること
- 公開ポートは 443/TCP のみ（SSH は管理 IP のみ許可）

## 使い方（概要）

1. `infra/env/sample.env` を `infra/env/.env` にコピーし、実値に更新する
2. `infra/bootstrap.sh` を実行する
3. `infra/setup/90-verify/10-healthcheck.sh` で起動確認する

```bash
cp infra/env/sample.env infra/env/.env
chmod 600 infra/env/.env
sudo bash infra/bootstrap.sh
sudo bash infra/setup/90-verify/10-healthcheck.sh
```

## 注意事項

- `.env` には MySQL/SMTP などの機密情報が含まれるため、Git 管理外にしてください。
- Nginx は 443 のみ公開し、80 は閉じたままです（TLS-ALPN-01 を使用）。
- `/metrics` は `METRICS_ALLOW_IPS` で指定した監視サーバーの IP のみ許可します。
- SSH は全 IP 許可のため、IP 制限が使えない環境向けの構成です。
- fail2ban と鍵認証を前提に運用し、ブロック状況の監視を必須としてください（`setup/10-security/30-fail2ban.sh`、`setup/10-security/10-ssh.sh` を参照）。
- `10-ssh.sh` は初期設定済み（PermitRootLogin no 前提）の確認のみ実行します（PubkeyAuthentication yes を検証）。

## ディレクトリ構成

```text
infra/
├── README.md
├── bootstrap.sh
├── env/
│   ├── sample.env
│   └── .env
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
