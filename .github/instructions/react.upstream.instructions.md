---
name: React upstream DI rules
description: React components must rely on contracts and AppProvider DI
applyTo:
  - "app/**/*.{tsx,ts}"
---
- Page / Component / Hook は `app/contracts/` に定義された interface/type のみを参照し、public 実装を直接 import しない。
- 依存解決は AppProvider のみで行い、コンポーネント内部で具象実装を生成しない。
- `private/` ディレクトリを追加しない。
