このリポジトリは [Next.js](https://nextjs.org) を [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) で生成したプロジェクトです。

## はじめに

まず開発サーバーを起動します。

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:4000](http://localhost:4000) を開くと結果を確認できます。

`app/page.tsx` を編集するとページが自動的に更新されます。

このプロジェクトはシステムフォントを利用しており、オフライン環境でもビルドできるようにしています。

## ローカル動作確認（.devcontainer）

1. VS Code で Dev Container（`.devcontainer`）を起動します。
2. リポジトリルートで依存関係をインストールします。

```bash
npm install
```

### Storybook/Docs

```bash
npm run storybook
```

ブラウザで `http://localhost:6006` を開きます。ポートが開けない場合は VS Code のポートフォワードで `6006` を追加してください。

### UI: Storybook Docs

Storybook 画面で `Components/StatusMessage` の Docs を開くか、`http://localhost:6006/?path=/docs/components-statusmessage--docs` にアクセスします。

### Vitest/Coverage

```bash
npm run test
npm run test:coverage
```

`coverage/` 配下にレポートが生成されます。

### Playwright/E2E

初回のみブラウザをインストールします。

```bash
npm run test:e2e:install
```

```bash
npm run test:e2e
```

E2E 実行時は `http://localhost:4100` を利用します。必要に応じてポートフォワードで `4100` を追加してください。

### Codecov/Visual

ローカルでは `npm run test:coverage` で `coverage/lcov.info` を生成します。Codecov へのアップロードや Chromatic/Percy の実行は CI で行います。ローカルで実行する場合は、以下のトークンを環境変数に設定してから実行してください。

```bash
export CHROMATIC_PROJECT_TOKEN=...
export PERCY_TOKEN=...
```

```bash
npm run chromatic
npm run percy
```

## さらに学ぶ

Next.js の詳細は次の資料をご覧ください。

- [Next.js Documentation](https://nextjs.org/docs) - Next.js の機能と API を確認できます。
- [Learn Next.js](https://nextjs.org/learn) - 対話式のチュートリアルです。

[Next.js の GitHub リポジトリ](https://github.com/vercel/next.js) も参照できます。フィードバックや貢献も歓迎しています。

## デプロイ

### Vercel へのデプロイ

Next.js アプリを最も簡単にデプロイする方法は、[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を利用することです。

詳細は [Next.js のデプロイ手順](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

### GitHub Pages へのデプロイ

`main` ブランチへの push で `.github/workflows/deploy-gh-pages.yml` が実行され、React 構成の `mock/v1/web` のビルド成果物が GitHub Pages に公開されます。
この GitHub Pages デプロイはモック用の React アプリ向けであり、Next.js 本体のデプロイとは別で運用します。

手動実行する場合は、`deploy-gh-pages.yml` で定義されている GitHub Actions のワークフロー名「Deploy React App to GitHub Pages」（`mock/v1/web` 向けの名称）を選びます。
必要であれば `mock_version` を指定して実行してください。
