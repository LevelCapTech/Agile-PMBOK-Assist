# 40 Testing Strategy — テスト戦略

- RULE: Storybook を UI コンポーネントの確認基盤として採用し、コンポーネント単位の状態を Story として管理する。
- RULE: UIユニットテストは Vitest + React Testing Library を標準とし、DOM環境は jsdom（または happy-dom）を採用する。
- RULE: API通信を伴うUIのテストは MSW によりHTTPをモックし、成功/失敗/遅延/空を最低1ケースずつ含める。
- RULE: ユースケース/ドメイン（`packages/**` の純TSロジック）は Vitest のユニットテストで検証する。
- RULE: HTTP境界（Route Handlers）は「ハンドラを直接呼ぶ統合テスト」を実施し、テストDBまたはトランザクションで検証する。
- RULE: 外部API連携は `nock` / `undici mock` / MSW（node）のいずれかでモックし、失敗/遅延/リトライを含めて検証する。
- RULE: E2Eは Playwright を採用し、主要導線のスモークテストを最小セットで維持する。
- RULE: E2E（Playwright）は「UI + Route + DB」を通すスモークで最終保証を行う。
- RULE: Next.js依存（`next/navigation`, `next/image`, `next/link`）はテスト用モック/スタブを共通化し、各テストに重複実装しない。
- RULE: カバレッジは `packages/` と `src/` を中心に測定し、`app/` は「テスト対象の境界」を明記する（例: Server Component は無理に数値目標に入れない）。
- RULE: 受入条件をテストで担保し、新機能やバグ修正には回帰テストを追加する。
