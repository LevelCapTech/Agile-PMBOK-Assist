# 30 Coding Standards — コーディング規約

- `.github/instructions/**/*.instructions.md` のパス別ルールを優先する。
- 互換性維持をデフォルトとし、破壊的変更は移行策・理由を plan / ADR に記載する。
- Next.js / React / TypeScript: 厳格な型付けを前提に `any` / `unknown` の乱用を避け、型ガードや Zod などで境界を明確化する。
- React: 関数コンポーネントと Hooks を基本とし、副作用は `useEffect` で明示、不要な再レンダーを防ぐために依存配列を厳密に管理する。
- Next.js: App Router 前提で Server / Client Component の責務を分離し、`"use client"` の使用は最小限に留める。
- 依存追加は最小限とし、バージョンをピン止めして `package.json` / `package-lock.json` に反映する。
- ログ/コメント/Doc は簡潔に。秘密情報・個人情報をログやコメントに残さない。
- テスト可能な構造（副作用を分離、関数・メソッドを小さく）を心掛ける。
- コミットメッセージ:
  - `.github/instructions/commit-messages.instructions.md` を唯一の参照源とし、Copilot 生成を含む全コミットで同じ日本語・プレフィックス・3行構造ルールを適用する。
