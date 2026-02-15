---
name: Next.js upstream architecture rules
description: Next.js plugin architecture SSOT
applyTo:
  - "app/**/*.{tsx,ts}"
  - "app/contracts/**/*.{ts,tsx}"
  - "app/providers/**/*.{ts,tsx}"
---
- AppProvider を唯一の Composition Root とし、依存性注入はここでのみ行う。
- contracts は interface/type のみを定義し、実装や具体的な API 依存を持ち込まない。インターフェース名は `ドメイン名 + DataSource`（例: `GanttDataSource`）など、SSOT で定めたパターンに従う。
- contracts から providers などの実装を import しない。
- providers/public は public で完結する完成実装のみを置く。
- public リポジトリに private 実装や `private/` ディレクトリを追加しない。
- 上記の規約は ESLint の `no-restricted-imports` で `private/` への import を禁止することで技術的に担保する。
