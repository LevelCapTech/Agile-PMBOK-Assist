# スタイリング基盤（Tailwind v4 + MUI）

## 使い分けルール

- MUI はテーマ/コンポーネントの見た目（色・タイポ・UIパターン）を管理する。
- Tailwind はレイアウト/間隔/レスポンシブ/微調整のユーティリティに限定する。
- 同一要素で同一プロパティを多重指定しない（例: padding や color を Tailwind と MUI で重ねない）。

## スタイル順序の固定

- `src/providers/AppProvider.tsx` で `AppRouterCacheProvider` に `enableCssLayer: true` を指定し、MUI のスタイルを `@layer mui` として注入する。
- `app/globals.css` の先頭で `@layer mui, utilities;` を宣言し、Tailwind の utilities で上書きできる順序を固定する。

## 追加ファイルの責務

- `src/providers/appTheme.ts`: MUI テーマの既定値を管理する（カラーやタイポの変更はここに集約）。
- `src/providers/AppProvider.tsx`: `AppRouterCacheProvider` / `ThemeProvider` / `CssBaseline` を適用する。
- `app/layout.tsx`: DI 起点として `AppProvider` を配置し、スタイル注入順を固定する。
- `.storybook/preview.tsx`: Storybook でも `StyledEngineProvider(injectFirst)` と CSS Layers 設定を組み合わせて MUI のスタイルを `@layer mui` に配置し、本番と同じ上書き順（MUI → Tailwind utilities）でプレビューできるように Decorator を設定する。

## stylelint運用（方式C: 生成CSS lint）

- CI では `app/globals.css` を入力に Tailwind CLI で `.ci-artifacts/generated.css` を生成し、stylelint は生成CSSのみを対象にする。
- 入力CSS直lint（方式A/B）や CSS-in-JS の全面監査は行わない。Tailwind v4 のディレクティブと Emotion の動的記法が誤検知を招きやすく、追随設定が肥大化するため。
- ローカルで確認する場合は以下の順で実行する。
  - `npx tailwindcss -i app/globals.css -o .ci-artifacts/generated.css --minify`
  - `npx stylelint .ci-artifacts/generated.css`
- 適用ルールは `.stylelintrc.json` の最小構成（`block-no-empty` / `color-no-invalid-hex` / `property-no-unknown`）に限定する。
- 生成物は CI 内の一時ファイルとして扱い、通常は artifact 保存しない（デバッグ時のみ保存を検討する）。
