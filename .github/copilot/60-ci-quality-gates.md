# 60 CI Quality Gates — 必須ジョブと基準

## 必須ジョブ（例）
- **format**: `prettier .`（またはプロジェクト指定のフォーマッタ）
- **lint**: `eslint .` など静的解析を実行
- **typecheck**: `tsc --noEmit` で型整合性を確認
- **test**: `vitest run` / `jest` でユニット/回帰テストを実行
- **security**: `npm audit` など依存脆弱性スキャン
- **design-doc-sanity**: 設計成果物 Markdown にテンプレート記号（`<<...>>`）が残っていないことを検査
- **architecture-lint**: import 境界・エイリアス・UI export 規約の静的検査を実行
- **design-diagram-sanity**: シーケンス図/メソッド一覧/メソッドフローが全TBDになっていないことを検査

## 運用ルール
- すべての必須ジョブをブランチ保護の required status checks に設定し、失敗時はマージ不可。
- CI ログに Secrets/PII を出さない。必要な権限のみを `permissions` で明示する。
- キャッシュや並列実行は再現性を損なわない範囲で利用し、結果が変わる場合は無効化する。
- 品質ゲートで検出した問題は plan / PR に反映し、再現手順と修正内容を残す。
- 設計成果物の確認手順（例）:
  - `rg -n '<<[^>]+>>' .github/copilot/plans docs --glob '*.md'`
  - テンプレートファイル（`80-templates/*.md`）は検査対象外とし、成果物のみを対象にする。
  - （ローカル確認専用）ドラフトも含めて確認する場合は、`.gitignore` 対象のため CI では実行せず、例として `rg -n '<<[^>]+>>' .github/copilot/plans docs/draft --glob '*.md'` をローカルで実行する。
- 設計図の全TBD検査手順（例）:
  - シーケンス図（`5.7`）で、`PARAM` / `RETURN` / `ERROR` がすべて `TBD（理由/決定条件/期限）` の場合は fail とする。
  - メソッド一覧（`5.8.1`）で、`FLOW-*` 行のメソッド名が全件 `TBD（理由/決定条件/期限）` の場合は fail とする。
  - メソッドフロー（`5.8`）で、`START METHOD` / `INPUT` / `PROCESS` / `RETURN` が全図 `TBD（理由/決定条件/期限）` の場合は fail とする。
  - 簡易確認コマンド例:
    - `rg -n 'PARAM: TBD（理由/決定条件/期限）|RETURN: TBD（理由/決定条件/期限）|ERROR: TBD（理由/決定条件/期限）' <設計成果物.md>`
    - `rg -n '^\\| FLOW-[0-9]{2} \\| TBD（理由/決定条件/期限） \\|' <設計成果物.md>`
    - `rg -n 'START METHOD: TBD（理由/決定条件/期限）|INPUT: TBD（理由/決定条件/期限）|PROCESS: TBD（理由/決定条件/期限）|RETURN: TBD（理由/決定条件/期限）' <設計成果物.md>`
  - 上記ヒットが対象章の行数と一致する場合は fail とし、最低3件以上を具体値へ更新する。
- import / export 規約の確認手順（例）:
  - `packages/contracts` 参照は `@upstream/contracts` エイリアス以外を fail とする。
  - UI コンポーネントの `export default` を fail とする（Named Export のみ許可）。
  - UI コンポーネントの `index.ts` 経由 import を fail とする（直接ファイル import のみ許可）。
  - `app/` / `src/` / `pages/` で `index.ts` など barrel 再エクスポート経由 import を fail とする（直接ファイル import のみ許可）。
- Next.js 物理境界ルールの確認手順（例）:
  - browser API / client-only hooks を使用するファイルで、先頭に `"use client"` が無い場合は fail とする。
  - cookie/session 読取が `getServerSideProps` / Route Handler / Server Component 以外に存在する場合は fail とする。
  - DI 起点が `pages/_app.tsx` または `app/layout.tsx` 以外に分散している場合は fail とする。
  - `page.tsx` / `pages/*.tsx` で DI 生成（`new` や `create*Deps`）を行っている場合は fail とする。
