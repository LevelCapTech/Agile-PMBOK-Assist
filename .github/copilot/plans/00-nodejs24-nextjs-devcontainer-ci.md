# Implementation Plan — Node.js 24 / Next.js 前提の基盤更新

## 1. 機能要件 / 非機能要件

- 機能要件:
  - DevContainer を Node.js 24 ベースに更新し、`npm ci` 後に `npm run dev` が実行できる状態にする。
  - CI を Node.js 24 で `lint` / `typecheck` / `test` / `build` を実行する構成に更新する。
  - Dependabot を npm 中心へ再構成し、GitHub Actions も更新対象に含める。
  - README/開発手順を Next.js 前提で更新し、本番 Docker 前提の記述を撤廃する。
- 非機能要件:
  - Node.js 24 固定で再現可能にする。
  - lockfile が無い場合は CI を失敗させる。
  - Secrets/PII をログに出さない。

## 2. スコープと変更対象

- 変更ファイル（新規/修正/削除）:
  - 修正: `.devcontainer/devcontainer.json`, `.devcontainer/Dockerfile`, `.devcontainer/docker-compose.yml`
  - 修正: `.github/workflows/deploy-gh-pages.yml`
  - 新規: `.github/workflows/ci-nextjs.yml`
  - 修正: `.github/dependabot.yml`
  - 修正: `.vscode/extensions.json`, `.vscode/settings.json`
  - 修正: `app/mook/v1/web/package.json`, `app/mook/v1/web/package-lock.json`
  - 修正: `README.md`, `docs/README_INIT_REPO.md`
  - 新規: `docs/REBUILD.md`
- 影響範囲・互換性リスク:
  - npm スクリプト追加により CI が lint/test を実行する。
  - React Router 用依存の固定化で `npm ci` の再現性を確保する。
- 外部依存・Secrets の扱い:
  - `GITHUB_TOKEN` の最小権限のみ使用し、新規 Secrets は追加しない。

## 3. 設計方針

- 責務分離 / データフロー:
  - DevContainer は Node.js 24 ベースの開発環境に固定し、アプリは `app/mook/v1/web` を対象にする。
  - CI は `appDir` を環境変数で切替可能にし、既定値は `app/mook/v1/web` とする。
- エッジケース / 例外系 / リトライ方針:
  - `package-lock.json` が無い場合は即失敗させる。
  - `npm ci` が失敗した場合は依存バージョン固定を見直す。
- ログと観測性（漏洩防止を含む）:
  - Actions ログに Secrets/PII を出さない。

### 3.1 製造時の変更予定ファイル一覧

| No. | パス | 変更内容 |
| --- | -- | ---- |
| 1 | `.devcontainer/devcontainer.json` | Node.js 24 ベースの DevContainer に更新 |
| 2 | `.github/workflows/ci-nextjs.yml` | Node.js 24 CI を追加 |
| 3 | `.github/dependabot.yml` | npm + GitHub Actions 更新に再構成 |
| 4 | `app/mook/v1/web/package.json` | lint/test スクリプトと依存の固定 |
| 5 | `README.md` | Next.js 前提の手順に更新 |

## 4. 設計UML

- シーケンス図:(MermaidでUMLを追加する)
- 処理フロー図:(MermaidでUMLを追加する)

## 5. 人間が行う作業:

| 手順ID | 作業名 | 作業の目的 | 具体的な作業内容（人間がやることを詳細に書く） | 判断・確認ポイント | 完了条件（チェック可能な状態） |
| ---- | --- | ----- | ----------------------- | --------- | --------------- |
| H-01 | DevContainer 起動 | Node.js 24 環境で開発できることを確認 | DevContainer を起動して `npm ci` を実行する | 依存インストールが成功するか | `npm ci` が成功する |
| H-02 | CI 実行確認 | Node.js 24 CI の動作確認 | CI で lint/typecheck/test/build が動くかを確認する | lockfile 必須チェックの動作 | CI が成功する |
| H-03 | ドキュメント確認 | 変更内容の周知 | README/REBUILD の手順をレビューする | Docker 前提が削除されている | ドキュメントが最新化されている |

### 5.1 使用する情報・資料

- 作業に必要な資料:
  - Issue 要件（Node.js 24 / Next.js 前提）

## 6. テスト戦略

- テスト観点（正常 / 例外 / 境界 / 回帰）:
  - 正常: `npm ci` が成功し、`npm run build` が完了する。
  - 例外: lockfile 欠如時に CI が失敗する。
- モック / フィクスチャ方針:
  - 既存のテスト構成を利用し、新規フィクスチャは追加しない。
- テスト追加の実行コマンド（例: `npm run test`）:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`

## 7. CI 品質ゲート

- 実行コマンド（format / lint / typecheck / test / security）:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- 通過基準と失敗時の対応:
  - 失敗した場合は依存関係・Node.js バージョンを確認し、再実行する。

## 8. ロールアウト・運用

- ロールバック方法:
  - 変更コミットを revert して Node.js 24 前提の設定を元に戻す。
- 監視・運用上の注意:
  - 本番は Docker を使用しない前提で運用する。

## 9. オープンな課題 / ADR 要否

- 未確定事項:
  - Next.js 実装の本体配置やデプロイ方式の最終決定。
- ADR に残すべき判断:
  - 本番デプロイ方式の最終方針。
