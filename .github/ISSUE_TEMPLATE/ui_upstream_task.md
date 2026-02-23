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
| Atoms |  |  |  |
| Molecules |  |  |  |
| Organisms |  |  |  |
| Templates（必要な場合のみ） |  |  |  |

## 7. コンポーネント一覧

* 各コンポーネントは「責務」「Props型」「状態保持の有無」「依存コンポーネント」「再利用可否」「表示専用」を必ず定義する。
* 状態保持は原則なし（必要な場合は理由を明記する）。

| Atomic階層 | コンポーネント名 | 責務（1文） | Props型定義 | 状態保持 | 依存コンポーネント | 再利用可否 | 表示専用 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Atoms |  |  |  |  |  |  |  |
| Molecules |  |  |  |  |  |  |  |
| Organisms |  |  |  |  |  |  |  |
| Templates |  |  |  |  |  |  |  |

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
|  |  |  |  |

## 9. Storybook生成要件

* 全てのAtomic Design階層（Atoms / Molecules / Organisms / Templates）でStoryを作成する。
* Propsバリエーションがある場合は全パターン作成する。
* Controls有効化、Docs自動生成を有効化する。
* Storybook Test Runnerで以下を満たすこと。
  * 全Storyのレンダリング成功
  * console error なし
  * interaction test成功（存在する場合）
  * a11y違反なし（導入済みの場合）

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

* SSOT準拠が明文化されている
* Atomic分解が強制仕様になっている
* ロジック禁止が明文化されている
* Storybook Test RunnerがCIに含まれている
* 次Agentがページのみ整備可能状態である
* レビューで固定可能（品質ゲートを満たし承認可能な状態）
* コンポーネントは pages 配下に存在しない
* データ未接続状態である
* Container 未実装状態である
* 外部依存を持たない
* Storybook 上で視覚確認可能
