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

ブラウザで [http://localhost:4000](http://localhost:4000) を開くと結果を確認できます。詳細な開発手順は [docs/REBUILD.md](docs/REBUILD.md) を参照してください。

`app/page.tsx` を編集するとページが自動的に更新されます。

このプロジェクトは [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) を使用して、Vercel の新しいフォントファミリーである [Geist](https://vercel.com/font) を最適化して読み込みます。

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

手動実行する場合は、`deploy-gh-pages.yml` で定義されている GitHub Actions のワークフロー名「Deploy React App to GitHub Pages」（`mock/v1/web` 向けの名称）を選び、必要であれば `mock_version` を指定して実行してください。
