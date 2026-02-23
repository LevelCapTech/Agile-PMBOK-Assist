---
name: UI整備Issueテンプレート(Upstream)
about: Next.js + Atomic Design + Storybook のUI整備専用テンプレートです
title: "[UI] Upstream: ★ここに画面名★ UI整備"
labels: "ui"
assignees: ""
---

<!--
置換手順:
1. ★ここに画面名★: 対象画面名に置換する（例: 進捗ダッシュボード）。
2. <design-doc-path>: 参照する機能設計書Markdownのパスに置換する（例: .github/copilot/plans/123-page-foo.md）。
3. <owner>: リポジトリのオーナー名に置換する（例: LevelCapTech）。
4. <repo>: リポジトリ名に置換する（例: Agile-PMBOK-Assist）。
5. <issue-number>: 設計Issue番号に置換する（例: 123）。
6. <pr-number>: 設計PR番号に置換する（例: 456）。
7. <mock-path>: モックファイルパスまたは参照リンクに置換する。
8. <component-prefix>: 命名衝突回避プレフィックスに置換する（例: Lc）。
-->

# [UI] Upstream: ★ここに画面名★ UI整備

## 1. ゴール

* UI整備完了後、次のAgentがページ統合作業のみを行えば完了できる状態にする。
* Atomic Design 粒度で UI を実装し、Storybook で視覚確認できる状態にする。
* UI は Pure Component とし、ロジックや外部依存を持たない。

### 1.1 In Scope

* React + Tailwind モックの分解
* Atomic Design 粒度での再設計
* コンポーネント実装
* Storybook 生成
* Storybook Test Runner 対応
* CSS競合排除

### 1.2 技術スタック

* Next.js
* React
* TailwindCSS
* MUI（Emotion 前提）

## 2. SSOT参照

* 実装は必ず機能設計書（Markdown）を SSOT とする。
* 設計Issue本文・設計Issueコメント・設計PR本文・設計PRコメントを参照する。
* SSOT と差異がある場合は実装しない（DESIGN へ差し戻す）。
* 参照する機能設計書: `<design-doc-path>`

### 2.1 参照ブロック（必須）

* `.github/copilot/00-index.md`
* `.github/copilot-instructions.md`
* `.github/instructions/**/*.instructions.md`
* `.github/copilot/10-requirements.md`
* `.github/copilot/20-architecture.md`
* `.github/copilot/30-coding-standards.md`
* `.github/copilot/40-testing-strategy.md`
* `.github/copilot/50-security.md`
* `.github/copilot/60-ci-quality-gates.md`
* `.github/copilot/80-templates/*`

## 3. 設計Issueリンク

* https://github.com/<owner>/<repo>/issues/<issue-number>
* 設計Issue本文とコメントの内容を参照すること。

## 4. 設計PRリンク

* https://github.com/<owner>/<repo>/pull/<pr-number>
* 設計PR本文とコメントの内容を参照すること。

## 5. モック情報

* モック参照先: `<mock-path>`
* モックは UI 形状合わせのみに使用し、仕様追加は禁止。

## 6. Atomic分解方針

### 6.1 分解ルール

* モックをそのままコンポーネント化しない。
* 設計書に軽く触れられている粒度を最低単位とする。
* モックより細かい単位で分解する。
* Atomic Design 階層（Atoms / Molecules / Organisms / Templates）を明示する（Pages は対象外）。

### 6.2 分解結果（必須）

| Atomic階層 | 対象要素 | コンポーネント候補 | 目的/責務 |
| --- | --- | --- | --- |
| Atoms | `<ボタン/ラベル/アイコンなど最小要素>` | `<component-prefix><Name> / <Name>Atom` | `<単一責務を1文で記載>` |
| Molecules | `<入力行/カード行など複合要素>` | `<Feature><Name>Item` | `<Atomsを組み合わせる責務>` |
| Organisms | `<一覧/ヘッダ/ナビ等のセクション>` | `<Feature><Section>Panel` | `<セクション全体の表示責務>` |
| Templates（必要な場合のみ） | `<画面レイアウト全体>` | `<ScreenName>LayoutTemplate` | `<領域配置・構造提供の責務>` |

## 7. コンポーネント一覧

* 各コンポーネントは「責務」「Props型」「状態保持の有無」「依存コンポーネント」「再利用可否」「表示専用」を必ず定義する。
* 状態保持は原則なし（必要な場合は理由を明記する）。

| Atomic階層 | コンポーネント名 | 責務（1文） | Props型定義 | 状態保持 | 依存コンポーネント | 再利用可否 | 表示専用 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Atoms | `<component-prefix><Name>` | `<何を表示するかを1文で記載>` | `<Name>Props` | `なし` | `なし` | `可/否` | `はい` |
| Molecules | `<Feature><Name>Item` | `<何を組み合わせて表示するか>` | `<Name>ItemProps` | `なし/最小限` | `<component-prefix><Name>, ...` | `可/否` | `はい` |
| Organisms | `<Feature><Section>Panel` | `<セクション単位の表示責務>` | `<Section>PanelProps` | `なし/最小限` | `<Feature><Name>Item, ...` | `可/否` | `はい` |
| Templates | `<ScreenName>LayoutTemplate` | `<画面構造を提供する責務>` | `<ScreenName>LayoutTemplateProps` | `なし` | `<Header>, <Sidebar>, ...` | `可/否` | `はい` |

### 7.1 命名衝突回避ルール（必須）

* Atoms は `<component-prefix>` を先頭に付与する（例: `<component-prefix>Avatar`, `<component-prefix>IconButton`）。
* 代替として接尾辞 `Atom` 方式を採用してもよい（例: `AvatarAtom`）。Issue内で方式を統一する。
* MUIの同名コンポーネント（`Avatar`, `IconButton`, `Button` 等）を直接exportしない。
* Barrel export時にMUI名へ再エイリアスしない（例: `export { <component-prefix>Avatar as Avatar }` を禁止）。

### 7.2 ViewModel/Props型定義（必須）

* このセクションだけで実装可能なように、画面用の型を完全展開する。
* 「設計書参照のみ」「既存型を参照」等の省略記載を禁止する。
* 型定義には最低限 `ViewModel`、各セクションItem型、各コンポーネントProps型を含める。
* 特定画面固有の型名や構造をテンプレートに固定しない。画面ごとに必要な型をこのセクションへ展開する。

```ts
// 例: 画面ViewModel（必須）
export interface <ScreenName>ViewModel {
  header: <ScreenName>HeaderView;
  sidebar: <ScreenName>SidebarView;
  // TODO: 画面で使用する一覧/統計/設定などを省略せず記載
}

// 例: Item型（必須）
export interface <ScreenName>ProjectItem {
  id: string;
  name: string;
  status: string;
  // TODO: 必要プロパティを完全展開
}

// 例: Props型（必須）
export interface <ScreenName>PageProps {
  viewModel: <ScreenName>ViewModel;
  // TODO: 必要なイベント/コールバックを明示する
  onClickPrimaryAction?: (actionId: string) => void;
}

// 例: 画面固有Item型（必要件数だけ定義）
export interface <ScreenName>PrimaryItem {
  id: string;
  name: string;
  status: string;
  // TODO: 画面固有フィールドを完全展開
}

export interface <ScreenName>SecondaryItem {
  id: string;
  label: string;
  value: string;
  // TODO: 画面固有フィールドを完全展開
}
```

| 型カテゴリ | 型名 | 定義場所（このIssue本文内） | 完全展開 |
| --- | --- | --- | --- |
| ViewModel | `<ScreenName>ViewModel` | `7.2` | `必須` |
| Item DTO | `<ScreenName>PrimaryItem / <ScreenName>SecondaryItem` | `7.2` | `必須` |
| Component Props | `<ScreenName>PageProps / <ComponentName>Props` | `7.2` | `必須` |

## 8. CSS責務定義

### 8.1 CSS前提

* StyledEngineProvider の `injectFirst` を前提とする。
* MUI は構造/コンポーネント責務、Tailwind はユーティリティ用途のみ。
* 同一要素で同一CSSプロパティの多重指定を禁止する。
* MUI と Tailwind で同一スタイル責務を持たせない。
* UpstreamではPC画面専用。メディアクエリ/レスポンシブ設計/スマートフォン対応を禁止する。
* 将来拡張を考慮した抽象化を禁止する。

### 8.2 CSS責務一覧（必須）

| 対象 | MUI責務 | Tailwind責務 | 競合回避方針 |
| --- | --- | --- | --- |
| `<ComponentName>` | `<構造/寸法/色/境界線など>` | `<余白/整列/表示制御など>` | `<同一CSSプロパティを片側固定>` |

### 8.3 Atoms単位スタイル責務（推奨）

* Atomsごとに「MUI利用/Tailwind利用/禁止プロパティ」を1行で固定する。
* 競合しやすい `padding`, `margin`, `font-size`, `color`, `border` は担当を固定する。

| Atom名 | MUI(sx/styled)利用 | Tailwind class利用 | 禁止プロパティ（禁止側に記載） |
| --- | --- | --- | --- |
| `<component-prefix><ComponentName>` | `あり/なし` | `あり/なし` | `例: <property> を<MUI/Tailwind>で指定禁止` |
| `<ComponentName>Atom` | `あり/なし` | `あり/なし` | `例: <property> を<MUI/Tailwind>で指定禁止` |

## 9. Storybook生成要件

* 全てのAtomic Design階層（Atoms / Molecules / Organisms / Templates）でStoryを作成する。
* Propsバリエーションがある場合は全パターン作成する。
* Controls有効化、Docs自動生成を有効化する。
* Storybook Test Runnerで以下を満たすこと。
  * 全Storyのレンダリング成功
  * console error なし
  * interaction test成功（存在する場合）
  * a11y違反なし（導入済みの場合）

### 9.1 必須Story一覧（推奨）

* 生成物のSSOTとして、コンポーネントごとに最低限必要なStoryキーを列挙する。
* `default` のみで完了扱いにしない。状態/variantがある場合は対応Storyを必須化する。

| Atomic階層 | コンポーネント名 | 必須Storyキー |
| --- | --- | --- |
| Atoms | `<component-prefix><Name>` | `default`, `disabled` |
| Molecules | `<Feature><Name>Item` | `default`, `empty` |
| Organisms | `<Feature><Section>Panel` | `default`, `loading`, `error` |
| Templates | `<ScreenName>LayoutTemplate` | `default` |

## 10. 変更禁止範囲

### 10.1 Out of Scope（実装禁止）

* API呼び出し / データフェッチ
* API import / fetch / axios / useQuery 系
* 状態管理ロジック / useEffect / 非同期処理
* グローバル状態参照（Zustand/Recoil/Redux 等）
* ルーティング処理 / ページ統合 / コンテナ実装
* サーバーコンポーネント利用

### 10.2 変更禁止パス・モジュール（必要に応じて追記）

* DO NOT CHANGE:
  * なし

## 11. 品質ゲート

* format
* lint
* typecheck
* unit test
* security
* Storybook build
* Storybook Test Runner

## 12. Done定義

* 6章で定義したAtomic分解に対応するUIコンポーネントが実装されている
* 7章で定義したProps型と実装コードが一致している（型エラーなし）
* 命名衝突回避ルールに違反するコンポーネント名が存在しない
* MUI同名コンポーネントの直接exportが存在しない
* UI実装にAPI呼び出し・非同期処理・グローバル状態参照が混入していない
* CSS責務定義（8章）どおりに実装され、同一プロパティの多重指定がない
* 9.1で定義した必須Storyキーが全コンポーネントで作成されている
* Storybook上で全Storyが表示確認でき、console error が発生しない
* Storybook Test Runner が成功する
* format / lint / typecheck / unit test / security / Storybook build が成功する
* コンポーネントは `pages` 配下に存在しない
* データ未接続（Container未実装・外部依存なし）を維持している
