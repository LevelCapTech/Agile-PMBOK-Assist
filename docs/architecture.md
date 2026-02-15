# Architecture

## Folder Structure (SSOT)

```
app/
  layout.tsx
  providers/
    AppProvider.tsx
    AppContext.ts
    public/
      createPublicDeps.ts
  contracts/
    gantt.ts
docs/
  architecture.md
```

- `private/` ディレクトリは作成禁止。
- `contracts/` は interface/type のみを定義し、実装は置かない。
- `providers/public/` は public で動作する完成実装のみを置く。

## Dependency Injection Rule

1. 依存性注入は AppProvider でのみ行う。
2. Page / Component / Hook は契約のみ参照する。
3. contracts は interface/type のみ定義する。
4. providers/public は動作する完成実装であること。
5. private 実装は public repo に存在してはならない。
6. AppProvider は public 実装しか知らない。
7. 差し替えは外側から行う。
