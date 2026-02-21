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

- ロールバック可能なリリースタグは `/opt/agile-pmbok-assist_repo/releases` 配下に作成されます。
- `.deploy-complete` マーカーファイルが存在するタグのみをロールバック対象として選択してください。

```bash
# ロールバック候補の一覧（リリースディレクトリを確認）
ls -la /opt/agile-pmbok-assist_repo/releases

# デプロイ完了済みリリースのみを確認（.deploy-complete が存在するもの）
find /opt/agile-pmbok-assist_repo/releases -maxdepth 2 -type f -name '.deploy-complete'

# 確認したタグを指定してロールバックを実行
sudo /usr/local/bin/agile-pmbok-assist-release-poll-deploy.sh --rollback <tag>
```

## 失敗時の確認ポイント

- `journalctl -u agile-pmbok-assist-release-deploy.service -n 200 --no-pager`
- `systemctl status nextjs.service --no-pager -l`
- `ls -la /opt/agile-pmbok-assist_repo/releases`
