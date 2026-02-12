# Implementation Plan — デザインモック配置リファクタリング（app/react → app/mook/v1/web）

## 1. 機能要件 / 非機能要件
- 機能要件:
  - `app/react/web` 配下のデザインモック資産を `app/mook/v1/web` へ再配置する。
  - 最新モックは GitHub Pages で継続公開し、公開 URL を維持する。
  - 将来のモック世代（v2 以降）を追加できる構成にする。
  - 実装用 React アプリとモック資産の責務を分離する。
- 非機能要件:
  - 公開停止を発生させない（既存 gh-pages デプロイ互換）。
  - 既存のビルド/デプロイ手順を最小限の変更で維持する。
  - モック更新時の切替手順を明確にする。

## 2. スコープと変更対象
- 変更ファイル（新規/修正/削除）:
  - 新規: `.github/copilot/plans/17-redesign-design-mock-directory-structure.md`
  - 実装時に新規作成: `app/mook/v1/web/**`（`app/react/web` から移動）
  - 実装時に修正: `.github/workflows/deploy-gh-pages.yml`（`working-directory` / `cache-dependency-path` / `publish_dir` の更新）
- 影響範囲・互換性リスク:
  - GitHub Pages 公開パスを維持するため、`VITE_BASE_PATH` と publish_dir の整合が必須。
  - ディレクトリ移動により相対パス参照（画像/フォント）に影響が出る可能性。
- 外部依存・Secrets の扱い:
  - 既存の `GITHUB_TOKEN` を継続使用。Secrets 追加なし。

## 3. 設計方針
- 責務分離 / データフロー:
  - `app/react` は実装用 React アプリ専用に整理する。
  - Web モックは `app/mook/v1/web` に集約し、モック公開の唯一のソースとする。
  - `deploy-gh-pages.yml` に環境変数 `MOCK_VERSION` を追加し、
    ビルドステップのシェル展開 `${MOCK_VERSION:-v1}` で
    `app/mook/${MOCK_VERSION:-v1}/web` をビルド対象に固定する。
  - 併せて `deploy-gh-pages.yml` の `working-directory`、
    `cache-dependency-path`、`publish_dir` を `app/mook/${MOCK_VERSION:-v1}/web` へ更新する。
- エッジケース / 例外系 / リトライ方針:
  - 移動後も `dist/client/index.html`（推奨）または `dist/index.html` の
    いずれかが生成されていることを前提とし、両方存在しない場合はデプロイ失敗とする。
  - `MOCK_VERSION` が未定義の場合でも、ワークフロー内の `${MOCK_VERSION:-v1}`
    により `v1` をデフォルトとして使用する。
- ログと観測性（漏洩防止を含む）:
  - GitHub Actions のログは既存のまま維持し、Secrets を出力しない。

## 4. テスト戦略
- テスト観点（正常 / 例外 / 境界 / 回帰）:
  - 正常: `app/mook/v1/web` で `npm run build` が成功し `dist/client` を生成する。
  - 例外: `index.html` 不在時に CI が失敗することを確認する。
  - 回帰: 既存の GitHub Pages URL が変わらないことを確認する。
- モック / フィクスチャ方針:
  - 既存のモックデータ/画像をそのまま移動し、追加のダミーデータは増やさない。
- テスト追加の実行コマンド（作業ディレクトリ: `app/mook/v1/web`）:
  - `npm ci --legacy-peer-deps`
  - `npm run typecheck`
  - `npm run build`

## 5. CI 品質ゲート
- 実行コマンド（format / lint / typecheck / test / security、作業ディレクトリ: `app/mook/v1/web`）:
  - `npm ci --legacy-peer-deps` → `npm run build`
  - `npm run typecheck`（現状の型エラーは別 Issue で解消するが、本リファクタリングで型エラーが増えていないことを確認）
- 通過基準と失敗時の対応:
  - `dist/client/index.html` または `dist/index.html` の生成を必須とし、失敗時は旧パスへロールバック。

## 6. ロールアウト・運用
- ロールバック方法:
  - `deploy-gh-pages.yml` の build/publish パスを `app/react/web` へ戻す（当該コミットを `git revert` するか、ブランチを切り戻す）。
  - `app/mook/v1/web` 追加後も、移行完了から 1 スプリント（例: 2 週間）を上限として main ブランチ上で旧ディレクトリを並存させ、その後はクリーンアップ用 PR で旧ディレクトリを削除する（Git の履歴上では永続的に保持される）。
- 監視・運用上の注意:
  - GitHub Pages の公開 URL を必ず確認し、404 が出ないことを確認する。

## 7. オープンな課題 / ADR 要否
- 未確定事項:
  - `app/react/mobile` のモック資産を `app/mook/v1/mobile` に移動する範囲。
  - `MOCK_VERSION` の切替を環境変数（workflow/env）で管理するか、`latest` ディレクトリ運用とするか。
- ADR に残すべき判断:
  - モック最新バージョンの切替手段（環境変数 vs. `latest` ディレクトリ）の最終方針。
