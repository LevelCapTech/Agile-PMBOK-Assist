# Implementation Plan — デザインモック配置リファクタリング（app/react → app/mook/v1）

## 1. 機能要件 / 非機能要件
- 機能要件:
  - `app/react` 配下のデザインモック資産を `app/mook/v1` へ再配置する。
  - 最新モックは GitHub Pages で継続公開し、公開 URL を維持する。
  - 将来のモック世代（v2 以降）を追加できる構成にする。
  - 実装用 React アプリとモック資産の責務を分離する。
- 非機能要件:
  - 公開停止を発生させない（既存 gh-pages デプロイ互換）。
  - 既存のビルド/デプロイ手順を最小限の変更で維持する。
  - モック更新時の切替手順を明確にする。

## 2. スコープと変更対象
- 変更ファイル（新規/修正/削除）:
  - 新規: `.github/copilot/plans/00-design-mook-v1-refactor.md`
  - 将来実装候補: `app/mook/v1/**`（`app/react` から移動）
  - 将来実装候補: `.github/workflows/deploy-gh-pages.yml`（ビルド対象パス更新）
- 影響範囲・互換性リスク:
  - GitHub Pages 公開パスを維持するため、`VITE_BASE_PATH` と publish_dir の整合が必須。
  - ディレクトリ移動により相対パス参照（画像/フォント）に影響が出る可能性。
- 外部依存・Secrets の扱い:
  - 既存の `GITHUB_TOKEN` を継続使用。Secrets 追加なし。

## 3. 設計方針
- 責務分離 / データフロー:
  - `app/react` は実装用 React アプリ専用に整理する。
  - モックは `app/mook/v1` に集約し、モック公開の唯一のソースとする。
  - `deploy-gh-pages.yml` では `MOCK_VERSION=v1` を環境変数化し、
    `app/mook/${MOCK_VERSION}/web` をビルド対象に固定する。
- エッジケース / 例外系 / リトライ方針:
  - 移動後に `dist/client/index.html` が生成されない場合はデプロイ失敗とする。
  - `MOCK_VERSION` が未定義の場合は `v1` をデフォルトに設定する。
- ログと観測性（漏洩防止を含む）:
  - GitHub Actions のログは既存のまま維持し、Secrets を出力しない。

## 4. テスト戦略
- テスト観点（正常 / 例外 / 境界 / 回帰）:
  - 正常: `app/mook/v1/web` で `npm run build` が成功し `dist/client` を生成する。
  - 例外: `index.html` 不在時に CI が失敗することを確認する。
  - 回帰: 既存の GitHub Pages URL が変わらないことを確認する。
- モック / フィクスチャ方針:
  - 既存のモックデータ/画像をそのまま移動し、追加のダミーデータは増やさない。
- テスト追加の実行コマンド:
  - `npm ci --legacy-peer-deps`
  - `npm run typecheck`
  - `npm run build`

## 5. CI 品質ゲート
- 実行コマンド（format / lint / typecheck / test / security）:
  - `npm ci --legacy-peer-deps` → `npm run build`
  - `npm run typecheck`（現状の型エラーは別 Issue で解消）
- 通過基準と失敗時の対応:
  - `dist/client/index.html` 生成を必須とし、失敗時は旧パスへロールバック。

## 6. ロールアウト・運用
- ロールバック方法:
  - `deploy-gh-pages.yml` の build/publish パスを `app/react/web` へ戻す。
  - `app/mook/v1` の追加後も旧ディレクトリを一時的に保持する。
- 監視・運用上の注意:
  - GitHub Pages の公開 URL を必ず確認し、404 が出ないことを確認する。

## 7. オープンな課題 / ADR 要否
- 未確定事項:
  - `app/react/mobile` のモック資産を `app/mook/v1/mobile` に移動する範囲。
  - `MOCK_VERSION` の切替をコード化するか、ワークフロー変数で管理するか。
- ADR に残すべき判断:
  - モック最新バージョンの切替手段（環境変数 vs. `latest` ディレクトリ）の最終方針。
