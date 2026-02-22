# 60 CI Quality Gates — 必須ジョブと基準

## 必須ジョブ（例）
- **format**: `prettier .`（またはプロジェクト指定のフォーマッタ）
- **lint**: `eslint .` など静的解析を実行
- **typecheck**: `tsc --noEmit` で型整合性を確認
- **test**: `vitest run` / `jest` でユニット/回帰テストを実行
- **security**: `npm audit` など依存脆弱性スキャン
- **design-doc-sanity**: 設計成果物 Markdown にテンプレート記号（`<<...>>`）が残っていないことを検査

## 運用ルール
- すべての必須ジョブをブランチ保護の required status checks に設定し、失敗時はマージ不可。
- CI ログに Secrets/PII を出さない。必要な権限のみを `permissions` で明示する。
- キャッシュや並列実行は再現性を損なわない範囲で利用し、結果が変わる場合は無効化する。
- 品質ゲートで検出した問題は plan / PR に反映し、再現手順と修正内容を残す。
- 設計成果物の確認手順（例）:
  - `rg -n '<<[^>]+>>' .github/copilot/plans docs/draft --glob '*.md'`
  - テンプレートファイル（`80-templates/*.md`）は検査対象外とし、成果物のみを対象にする。
  - 1件でもヒットした場合は fail とし、該当箇所を確定値または `TBD（理由/決定条件/期限）` へ置換する。
