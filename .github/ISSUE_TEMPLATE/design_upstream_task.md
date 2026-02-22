---
name: NextJS画面設計イシューテンプレート(Upstream Demo用)
about: NextJS画面設計向けのイシューテンプレートです
title: "[DESIGN] Upstream Demo: ★ここに画面名★"
labels: ''
assignees: ''
---

# [DESIGN] Upstream Demo: ダッシュボード画面

## 目的

Upstream(public) デモアプリを作成する。
本プロジェクトは Dependency Inversion Principle に基づき、 Composition Root（AppProvider）で依存を解決する Plugin 型アーキテクチャを採用する。

以下を SSOT として固定する。

* Plugin型（DIP）: 依存解決は Composition Root（AppProvider）のみ
* ページは contracts（契約）と public UI のみで構成できる

## 成果物
- `.github/copilot/80-templates/implementation-plan.md` に準拠した plan ドキュメントを`.github/copilot/plans/75-page-dashboard.md`として作成する。
- ファイル追加は、`.github/copilot/plans/75-page-dashboard.md`のみとする。
- コード修正・他のファイルの追加・編集を禁止する！

## 前提 / スコープ

* Upstream(public) のみ（private の存在/実装は一切書かない）
* ルーティングは App Router（**app/** 方式）を採用（希望に合わせる）
* モックデータは可（ただし publicデモとして動く完成実装）

### モック画面

モック画面 `mock/v1/web/src/app/page.jsx` を参考にダッシュボード画面を作成する。

下記の領域をモレキュール（Molecule）コンポーネントとして管理する

* プロジェクト一覧
* メンバー一覧
* 予算執行状況
* 設定ボタン
* 共通ヘッダ
* 左ペインのメニュー

## ゴール（このIssueで達成）

1. 「ページを追加する手順」が **SSOT化**されている
2. contracts と UI と DI が **規約通りに分離**されている
3. `.github/copilot/plans/<slug>.md` をコピーしてページを増やせる
4. サンプルとして `dashboard` 1ページだけ作成し、型と流れを確定する（※このページ自体が目的ではなく“型の検証”）

## 非ゴール

* private 実装、DB接続、認証、社内API等の導入
* 複数ページの実装（サンプル1ページで型を確定したら、個別Issueで量産）

## SSOT規範（必須）

### Dependency Injection Rule

* 依存性注入（依存解決）は `AppProvider.tsx` のみ
* `pages/*` は **contracts と public UI と AppContext のみ**参照可能
* `contracts/*` は interface/type のみ（実装、URL、認証、fetchなどの具体語禁止）
* `packages/ui/*` は public UI（会社固有前提なし）

### CSSフレームワーク

* MUI は Emotion エンジンを前提に運用する（推奨）
* styled は @emotion/styled を標準とする（MUIと同一基盤）
* Tailwind はユーティリティ（レイアウト/微調整/状態/レスポンシブ）用途に限定する
* スタイル注入順を固定し、Tailwind による上書きを容易にする

#### CSS必須ルール

- **スタイル注入順を固定する**：MUIのスタイルは先に注入し、Tailwind等で上書き可能にする（`StyledEngineProvider injectFirst`）
- **同一要素で同じプロパティを多重指定しない**（例：padding/color/fontをTailwindとMUIとstyledで混ぜない）

#### CSS原則

- MUIを `styled-components` エンジンへ切替（`@mui/styled-engine-sc`）は原則しない（SSR差分/依存/事故率が上がるため）

## フォルダ構造（Upstream）

* Next.js アプリのルートは repo 直下で固定。だけど UI/Contracts は同一repo内のローカルパッケージとして `packages/` に切る。
* 本repoは「`apps/` 配下にアプリを置く monorepo 形」は採用しない（＝アプリは repo 直下）。ただし `packages/` にローカルパッケージ（`ui` / `contracts` / `plugins`）を同居させる。
* `src/providers` はアプリ全体（Root layout 相当）の Provider 群、`app/**/providers.tsx` は画面スコープの Provider / Composition Root とする。
* UI はアトミックデザインを採用する。

  * Hooks は Organisms 以上（または Container）で許可。
  * Atoms/Molecules は基本ダム。状態は持っても「見た目に閉じる」。
  * 画面スコープの状態共有は Page/Template 配下の Context を第一選択。
  * Props drilling が 3 階層を超えたら Context or Container を検討。
* ルーティングは App Router（`app/` 方式）とする。

  * `next/router` は使わず `next/navigation` を使う。
  * Server Components がデフォルトで、クライアントが必要なコンポーネントだけ "use client" を付ける。

[見本]

```
app/
  layout.tsx              # Root layout（Server）
  page.tsx                # /（Server）
  dashboard/
    page.tsx              # /dashboard（Server）
    layout.tsx            # /dashboard 配下のレイアウト
    providers.tsx         # (use client) 画面スコープContextのComposition Root
    _components/          # ルート専用の薄い部品
      DashboardShell.tsx  # (use client) state/compose only

public/

src/
  providers/
    AppProvider.tsx         # (use client) アプリ全体のProvider
    AppContext.tsx
  composition/
    createClientContainer.ts
    createServerContainer.ts
    registerPlugins.ts
    pluginRegistry.ts
  lib/
    createClientDeps.ts     # Public deps factory（※containerを使うなら薄くする/廃止も可）
    createServerDeps.ts     # Server deps factory（※containerを使うなら薄くする/廃止も可）

packages/
  contracts/
    src/
      index.ts             # packages/contracts の公開API（barrel）
      domain/              # ドメインモデル（Entity/ValueObject など、UIやI/Oに依存しない）
        Project.ts         # ドメイン型: Project
        Session.ts         # ドメイン型: Session
      ports/               # 抽象（DIPの境界）。plugins がここを実装する
        ProjectRepository.ts # Project 永続化/取得の抽象
        SessionRepository.ts # Session 永続化/取得の抽象
        Telemetry.ts       # ログ/計測の抽象
        Auth.ts            # 認証/認可の抽象（例: 現在ユーザー取得、権限判定）
      usecases/            # ユースケース契約（アプリの操作単位）。container から呼ばれる
        SearchProjects.ts  # ユースケース: Project 検索
        GetProject.ts      # ユースケース: Project 取得
        GetSession.ts      # ユースケース: Session 取得
      dto/                 # 表示/転送向けのDTO（ドメインと分離したい場合）
        ProjectDto.ts      # DTO: Project 表示/転送用
      pages/
        dashboard.ts       # ページ単位の契約（Route単位）

  ui/
    src/
      pages/                # 見た目のページ（App Routerのpage.tsxとは別）/画面スコープのContext（フィルタ状態や選択状態など）を提供
        DashboardPage/
          DashboardPage.tsx
      atoms/                # state を持つ場合も UI状態（hover, open等）のみとする/ドメイン状態・データ取得・副作用は禁止
        ProjectName/
          ProjectName.tsx
      templates/            # レイアウト構造（Header/Footer/サイドバー配置など）/画面共通のContextはtemplatesで提供
        StandardLayout/
          StandardLayout.tsx
      molecules/            # 簡単な UI state は可、ただし外部I/Oやグローバル状態は避ける
        ProjectCard/
          ProjectCard.tsx
      organisms/            # hooks を許可（フォーム、リスト、フィルタ状態など）/ただし「ドメインの取得・永続化」は、可能なら usecase 呼び出し（container経由）に寄せる
        Header/
          Header.tsx
        ProjectCardList/
          ProjectCardList.tsx
        Footer/
          Footer.tsx

  plugins/
    src/
      index.ts
      http/
        projectRepository.ts
        sessionRepository.ts
      storage/
        cookieSessionStore.ts
      telemetry/
        consoleTelemetry.ts
      auth/
        noopAuth.ts
```

### ディレクトリの責務

#### `app/`（ルーティング：薄く）

* URL の入口（`page.tsx` / `layout.tsx`）だけを持つ。
* **実装詳細（HTTP/DB/Storage）を直に `new` しない。**
* ルートは「container（DIコンテナ）から usecase を呼ぶ」くらいに留める。

例：

* `app/dashboard/page.tsx` は `DashboardPage`（UI）に props を渡す or サーバでデータ取得して渡す。

#### `src/composition/`（Composition Root：依存解決の中心）

* 依存（ports の実装）を組み立て、usecase を生成し、必要なら plugin を登録。
* App Router の Server/Client の違いに合わせて入口を分ける。

推奨ファイル：

* `createClientContainer.ts`：ブラウザ実行（"use client" 側）で使う依存を束ねる。
* `createServerContainer.ts`：サーバ実行で使う依存を束ねる（秘密情報・サーバ専用 OK）。
* `registerPlugins.ts`：どの plugin 実装を採用するか（差し替え点）。
* `pluginRegistry.ts`：plugin の登録/参照の器。

#### `src/providers/AppProvider.tsx`（Client Composition Root）

* React Context などで container をアプリに流す。
* ここが「Provider としての Composition Root（AppProvider）」の本体。

分業の明確化：

* `src/composition` は **container 生成（依存解決）**
* `src/providers` は **container を React ツリーへ注入（Provider）**

### plugins パッケージ（実装の差し替え：必須）

#### `packages/plugins/`

* `contracts/ports` を満たす実装群。
* 例：HTTP 版 repo、cookie 版 session、console telemetry など。
* upstream ではデフォ実装をここに置き、downstream で差し替える方針とも相性が良い。

`packages/plugins/` は必須とする。実装の差し替え点は原則ここに集約し、採用と切替は `src/composition/registerPlugins.ts` で確定する。


### Atomic Design（ui）

#### `packages/ui/`

* Atoms/Molecules：基本ダム（状態は「見た目に閉じる」）。
* Organisms 以上（or Container）で hooks / 状態 / Context 利用。
* Templates：レイアウト構造。
* Pages：画面の見た目のまとまり（App Router の `page.tsx` とは別）。

**呼び出し責務の固定**：

* usecase を呼ぶのは原則 `app/` or `src/*`（container 側）
* `packages/ui` は props を受けて描画に専念（Atoms/Molecules の原則と整合）


### contracts の方針（ドメイン/ユースケース単位が一次）

#### `packages/contracts/src/domain/`

* ドメインモデル（Entity/ValueObject 的な型）。
* 例：`Project`, `Session`。

#### `packages/contracts/src/ports/`

* DIP の「抽象（依存の向きの逆転）」。
* 例：`ProjectRepository`, `SessionRepository`, `Telemetry`。

#### `packages/contracts/src/usecases/`

* ユースケース単位の契約（再利用の核）。
* 例：`SearchProjects`, `GetProject`, `GetSession`。
* UI（アプリ側の container）はこの usecase 契約を呼ぶ（または adapter 経由）。

#### `packages/contracts/src/dto/`（任意）

* 表示用/転送用の DTO（ドメインと分離したい場合）。

> ページ単位の contracts は「必須」ではなく、必要が出たら **composition** として追加する位置づけが安全。
> 例：`contracts/src/pages/dashboard.ts` は、`SearchProjects` 等を束ねるだけの薄い合成契約にする。


## 型定義（SSOTとして固定）

各ページは必ず次の 4 点セットで追加する。

1. docs: `.github/copilot/plans/<slug>.md`（ページ仕様）
2. contracts: `packages/contracts/src/pages/<slug>.ts`（interface/typeのみ）
3. ui: `packages/ui/src/pages/<slug>/<PageName>Page.tsx`（public UI）
4. app page: `app/<slug>/page.tsx`（Contextからdeps取得してUIへ渡すだけ）

## deps（依存束）の設計（Upstream内で完結）

* `AppContext` は `deps` を型付きで提供する
* `createPublicDeps` は “public完成実装”として、各ページ用の DataSource を返す（モックOK）

## 品質ゲート

* lint/typecheck/build が通る
* `app/dashboard/page.tsx` は contracts と ui と AppContext 以外に依存しない
* `contracts` に実装コードがない
* DIは AppProvider に固定されている

## Done

* dashboard サンプルで「docs→contracts→ui→page→AppProvider」の流れが確定している
* 契約のプロパティが明確である
* ルーティングが明確である
