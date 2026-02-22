# 30 Coding Standards — コーディング規約

- `.github/instructions/**/*.instructions.md` のパス別ルールを優先する。
- 互換性維持をデフォルトとし、破壊的変更は移行策・理由を plan / ADR に記載する。
- Next.js / React / TypeScript: 型安全性を優先し、`any` は型定義が事実上不可能な外部 API レスポンスなど正当な理由がある場合に限定して使用する。`unknown` は必要最小限に留め、型ガードや Zod などで境界を明確化する。
- React: 関数コンポーネントと Hooks を基本とし、副作用は `useEffect` で明示、不要な再レンダーを防ぐために依存配列を厳密に管理する。
- Next.js: App Router 前提で Server / Client Component の責務を分離し、`"use client"` の使用は最小限に留める。
- import ルール:
  - `packages/contracts` への参照は相対パスを禁止し、`@contracts/*` を使用する。
  - 例: `import type { DashboardDataSource } from "@contracts/pages/dashboard";`
- UI コンポーネント export ルール:
  - `export default` を禁止し、Named Export（`export const Xxx = ...`）で統一する。
  - `index.ts` 経由の import を禁止し、コンポーネントファイルを直接参照する。
  - 例: `import { DashboardPage } from "@/pages/dashboard/DashboardPage";`
- 依存追加は最小限とし、バージョンをピン止めして `package.json` / `package-lock.json` に反映する。
- ログ/コメント/Doc は簡潔に。秘密情報・個人情報をログやコメントに残さない。
- テスト可能な構造（副作用を分離、関数・メソッドを小さく）を心掛ける。
- コミットメッセージ:
  - `.github/instructions/commit-messages.instructions.md` を唯一の参照源とし、Copilot 生成を含む全コミットで同じ日本語・プレフィックス・3行構造ルールを適用する。
