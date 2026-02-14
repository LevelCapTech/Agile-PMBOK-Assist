# Implementation Plan

## 1. 機能要件 / 非機能要件

- 機能要件:
  - DevContainer の workspaceFolder を `/workspaces/agile-pmbok-assist` に固定する。
  - workspaceMount を固定パスに設定し、ディレクトリ欠落を防ぐ。
  - REBUILD に Next.js 設定の固定パス要件を明記する。
- 非機能要件:
  - 既存の開発手順との互換性を維持する。

## 2. スコープと変更対象

- 変更ファイル（新規/修正/削除）:
  - `.devcontainer/devcontainer.json`（修正）
  - `docs/REBUILD.md`（修正）
  - `.github/copilot/plans/00-devcontainer-fixed-workspace.md`（新規）
- 影響範囲・互換性リスク:
  - DevContainer の作業ディレクトリ固定に伴うパス前提の明確化。
- 外部依存・Secrets の扱い:
  - 追加なし。

## 3. 設計方針

- 責務分離 / データフロー:
  - DevContainer の固定パスを SSOT としてドキュメントに反映する。
- エッジケース / 例外系 / リトライ方針:
  - workspaceMount によりディレクトリ欠落を回避する。
- ログと観測性（漏洩防止を含む）:
  - 追加なし。

### 3.1 製造時の変更予定ファイル一覧

| No. | パス | 変更内容 |
| --- | --- | --- |
| 1 | .devcontainer/devcontainer.json | workspaceMount/workspaceFolder の固定パス確認 |
| 2 | docs/REBUILD.md | 固定パス要件の明記 |

## 4. 設計UML

- シーケンス図: 対象外
- 処理フロー図: 対象外

## 5. 人間が行う作業:

| 手順ID | 作業名 | 作業の目的 | 具体的な作業内容（人間がやることを詳細に書く） | 判断・確認ポイント | 完了条件（チェック可能な状態） |
| ---- | --- | ----- | ----------------------- | --------- | --------------- |
| H-01 | DevContainer 設定更新 | 固定パスの明示 | workspaceMount/workspaceFolder を `/workspaces/agile-pmbok-assist` に統一する | devcontainer.json の値が一致している | devcontainer.json の更新反映 |
| H-02 | REBUILD 記載更新 | 手順の明確化 | Next.js 設定に合わせた固定パス要件を追記する | 手順に固定パス理由が書かれている | REBUILD.md の更新反映 |
| H-03 | 手動検証 | 手順の妥当性確認 | npm スクリプトを実行して品質ゲートを確認する | lint/test/build が成功 | コマンド結果が成功 |

### 5.1 使用する情報・資料

- 作業に必要な資料:
  - `.devcontainer/devcontainer.json`
  - `docs/REBUILD.md`

## 6. テスト戦略

- テスト観点（正常 / 例外 / 境界 / 回帰）:
  - ドキュメント更新のため回帰確認のみ。
- モック / フィクスチャ方針:
  - なし。
- テスト追加の実行コマンド（例: `python -m pytest`）:
  - `npm run lint` / `npm run typecheck` / `npm run test` / `npm run build`（`mock/v1/web`）

## 7. CI 品質ゲート

- 実行コマンド（format / lint / typecheck / test / security）:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- 通過基準と失敗時の対応:
  - すべて成功。失敗時は変更内容を見直し、修正後に再実行する。

## 8. ロールアウト・運用

- ロールバック方法:
  - 変更したファイルを git revert で戻す。
- 監視・運用上の注意:
  - Next.js 設定で固定パス前提が維持されることを確認する。

## 9. オープンな課題 / ADR 要否

- 未確定事項:
  - なし。
- ADR に残すべき判断:
  - なし。
