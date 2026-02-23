# スタイリング基盤（Tailwind v4 + MUI）

## 使い分けルール

- MUI はテーマ/コンポーネントの見た目（色・タイポ・UIパターン）を管理する。
- Tailwind はレイアウト/間隔/レスポンシブ/微調整のユーティリティに限定する。
- 同一要素で同一プロパティを多重指定しない（例: padding や color を Tailwind と MUI で重ねない）。

## スタイル順序の固定

- `src/providers/AppProvider.tsx` で `AppRouterCacheProvider` に `enableCssLayer: true` を指定し、MUI のスタイルを `@layer mui` として注入する。
- `app/globals.css` の先頭で `@layer mui, utilities;` を宣言し、Tailwind の utilities で上書きできる順序を固定する。

## stylelint運用（方式C: 生成CSS lint）

- stylelint は Tailwind が生成した最終CSSのみを対象にする（入力CSSの直lintやCSS-in-JS全面監査は行わない）。
- 生成手順: `npm run build:generated-css` で `.ci-artifacts/generated.css` を作成する。
- lint手順: `npm run lint:generated-css` を実行し、違反時は生成CSSから入力CSS（`app/globals.css` や該当コンポーネントの className）へ逆引き修正する。
- A/B方式（入力CSSの直接lintやTailwind v4追随設定）は、ノイズ増加と設定保守コストが大きいため採用しない。
- `.ci-artifacts/generated.css` はデバッグ時のみ参照し、通常は保存しない。

## 追加ファイルの責務

- `src/providers/appTheme.ts`: MUI テーマの既定値を管理する（カラーやタイポの変更はここに集約）。
- `src/providers/AppProvider.tsx`: `AppRouterCacheProvider` / `ThemeProvider` / `CssBaseline` を適用する。
- `app/layout.tsx`: DI 起点として `AppProvider` を配置し、スタイル注入順を固定する。
- `.storybook/preview.tsx`: Storybook でも `StyledEngineProvider(injectFirst)` と CSS Layers 設定を組み合わせて MUI のスタイルを `@layer mui` に配置し、本番と同じ上書き順（MUI → Tailwind utilities）でプレビューできるように Decorator を設定する。
