# スタイリング基盤（Tailwind v4 + MUI）

## 使い分けルール

- MUI はテーマ/コンポーネントの見た目（色・タイポ・UIパターン）を管理する。
- Tailwind はレイアウト/間隔/レスポンシブ/微調整のユーティリティに限定する。
- 同一要素で同一プロパティを多重指定しない（例: padding や color を Tailwind と MUI で重ねない）。

## スタイル順序の固定

- `app/layout.tsx` の `AppRouterCacheProvider` で `enableCssLayer: true` を指定し、MUI のスタイルを `@layer mui` として注入する。
- `app/globals.css` の先頭で `@layer theme, base, mui, components, utilities;` を宣言し、Tailwind の utilities で上書きできる順序を固定する。

## 追加ファイルの責務

- `app/theme.ts`: MUI テーマの既定値を管理する（カラーやタイポの変更はここに集約）。
- `app/providers.tsx`: `ThemeProvider` / `CssBaseline` を適用する。
- `app/layout.tsx`: SSR 用の `AppRouterCacheProvider` を配置し、スタイル注入順を固定する。
- `.storybook/preview.tsx`: Storybook で `StyledEngineProvider` を併用しつつ MUI テーマが適用されるよう Decorator を設定する。
