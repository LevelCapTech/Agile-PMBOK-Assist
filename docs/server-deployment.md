# サーバーデプロイ運用（Release polling）

## 概要

- `infra/setup/40-web/40-release-poll-deploy.sh` が GitHub Release の `next-bundle.tgz` を取得して展開します。
- 展開先は `/opt/agile-pmbok-assist_repo/releases/<tag>` です。
- `current` シンボリックリンクを更新後、`nextjs.service` を再起動します。

## 手動実行

```bash
sudo systemctl start agile-pmbok-assist-release-deploy.service
```

## ロールバック

```bash
sudo /usr/local/bin/agile-pmbok-assist-release-poll-deploy.sh --rollback <tag>
```

## 失敗時の確認ポイント

- `journalctl -u agile-pmbok-assist-release-deploy.service -n 200 --no-pager`
- `systemctl status nextjs.service --no-pager -l`
- `ls -la /opt/agile-pmbok-assist_repo/releases`
