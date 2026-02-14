# REBUILD: 開発手順（Next.js / Node.js 24）

## 前提条件

- Node.js 24
- npm
- VS Code Dev Containers / GitHub Codespaces

## DevContainer での起動手順

1. VS Code でリポジトリを開き、Dev Containers 拡張を有効化する。
2. "Reopen in Container" を実行する。
   - workspaceFolder は Next.js の設定都合で `/workspaces/agile-pmbok-assist` 固定。
3. `app/mook/v1/web` で依存を取得する（DevContainer の postCreateCommand でも実行される）。
   - `npm ci`
4. 開発サーバーを起動する。
   - `npm run dev`
5. ポート 3000 をフォワードして動作確認する。

## ローカルでの起動手順（非 Docker）

1. `app/mook/v1/web` へ移動する。
2. `npm ci` を実行する。
3. `npm run dev` を実行する。

## CI 相当の実行コマンド

- `npm run lint`（現状は typecheck のエイリアス）
- `npm run typecheck`（JS/TS 混在のため一部の型チェックを緩和）
- `npm run test`
- `npm run build`

補足:
- JS/TS 混在のため `noImplicitAny` を一時的に無効化しており、段階的に有効化する。
- `react-router-hono-server` は依存互換性のため `2.13.0` に固定している。
