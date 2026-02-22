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

## GitHub 設定手順（CI 連携）

### Secrets 登録（Codecov/Chromatic/Percy）

1. GitHub の対象リポジトリを開き、`Settings` をクリックします。
2. 左メニューの `Secrets and variables` > `Actions` を開き、`Repository secrets` タブを選択します（`Environment secrets` は使いません）。
3. `New repository secret` をクリックし、以下の Secrets を追加します（追加後に `Add secret` を押して保存します）。

| Secret 名 | 取得元 | メモ |
| --- | --- | --- |
| `CODECOV_TOKEN` | Codecov の Repository Settings | Public リポジトリでもトークンを使う設定にしています。 |
| `CHROMATIC_PROJECT_TOKEN` | Chromatic の Project Settings | 初回作成後に発行されます。 |
| `PERCY_TOKEN` | Percy の Project Settings | 初回作成後に発行されます。 |

#### Codecov トークン取得手順

1. https://app.codecov.io/ にアクセスし、GitHub アカウントでサインインします。
2. 対象リポジトリを開き、`Settings` > `General` を開きます。
3. `Repository upload token` をコピーし、`CODECOV_TOKEN` として登録します。

### Branch Protection の必須チェック設定

1. GitHub の対象リポジトリで `Settings` をクリックします。
2. 左メニューの `Branches` を開き、`Branch protection rules` の `Add rule` を選択します。
3. `Branch name pattern` に `main` を入力します。
4. `Require status checks to pass before merging` を有効化し、次のチェックを選択します。
   - `codecov/project`
   - `codecov/components`
   - `codecov/features`
   - `codecov/hooks`
   - `codecov/lib`
   - `lint`
   - `test`
   - `test:e2e`
   - `build-storybook`
5. `Save changes` をクリックして保存します。

### Chromatic 初回プロジェクト作成

1. https://www.chromatic.com/ にアクセスし、GitHub アカウントでサインインします。
2. ダッシュボードで `New project` を選択し、対象の GitHub リポジトリを連携します（GitHub App の許可が求められる場合は許可します）。
3. プロジェクト作成時に「What kind of project is this?」が表示された場合は **Storybook** を選択します（本リポジトリは Storybook 静的ビルドを利用します）。
4. セットアップ完了後、`Project Settings` の `Project token` をコピーします。
5. GitHub の Secrets に `CHROMATIC_PROJECT_TOKEN` として登録します。

### Percy 初回プロジェクト作成

1. https://percy.io/ にアクセスし、GitHub アカウントでサインインします（BrowserStack アカウント作成が必要な場合は作成します）。
2. ダッシュボードで `Create project` を選択し、対象の GitHub リポジトリを連携します。
3. `What kind of project is this?` が表示された場合は **Storybook** を選択します（本リポジトリは `percy storybook:static` で実行します）。
4. プロジェクト作成後、`Project Settings` の `PERCY_TOKEN` をコピーします。
5. GitHub の Secrets に `PERCY_TOKEN` として登録します。

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
