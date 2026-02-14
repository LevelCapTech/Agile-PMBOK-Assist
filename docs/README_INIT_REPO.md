# GitHubでリポジトリを作ったら、まずすること

## 前提条件

このテンプレートプロジェクトは、Node.js 24 を前提に Dev Containers / Codespaces で開発する構成です。

- Node.js 24
- npm
- VS Code Dev Containers / GitHub Codespaces

## プロジェクトを立ち上げた人

- [ ] 開発環境を初期整備する

1. Codespaces もしくは DevContainer に接続する
2. init_repo.sh を編集し、シェルスクリプトを実行する
   ```
   replacement_map["<TODO:application_name>"]="sample-next-app"
   replacement_map["<TODO:project_path>"]="app/mook/v1/web"
   replacement_map["<TODO:application_code>"]="agile-pmbok-assist"
   replacement_map["<TODO:log_dir>"]="/path/to/logs"
   ```
3. DevContainer で `npm ci` → `npm run dev` を実行して動作を確認する
4. 動かして問題が無かったら、init_repo.sh を手動削除する
5. 変更したファイルをコミットして push する

## 開発者メンバーへの周知

まず、VS Code をインストールしてください。
拡張機能のフィルタ条件に @recommended を入力しワークスペースの推奨事項をすべてインストールします。

## さいごに

### このファイルを編集したい人へ

番号付きリストに改行を加えたいときは行末にスペースを2つ入れて、改行するとうまいように改行します。
