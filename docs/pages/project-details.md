# プロジェクト詳細画面

## 概要

`/projects/[id]` でプロジェクト詳細を表示する。契約は `ProjectDetailsDataSource` に集約し、DI 経路（AppProvider → AppContext → page → UI）で受け渡す。

## 画面URL

- `/projects/[id]`

## 表示要素

- ヘッダー: プロジェクト名 / コード / 開始日
- フェーズ毎の進捗
- プロジェクトメンバー
- 会議体一覧（空の場合は空状態文言を表示）
- 全体進捗状況（完了 / 進行中 / 未着手）
- プロジェクト計画（折りたたみセクション）

## データ契約

- `ProjectDetailsDataSource.getProjectDetails(projectId: string)`
  - 成功時: `ProjectDetailsPageData`
  - 失敗時: `ProjectDetailsError`

## エラー表示

- `NOT_FOUND`: 「プロジェクトが見つかりません。」
- `NETWORK`: 「通信に失敗しました。」＋再読み込み導線
- `UNAUTHORIZED`: 権限エラー文言＋ログイン導線
- `UNKNOWN`: 予期せぬエラー文言＋再読み込み導線

## 受入条件

- `/projects/[id]` で対象プロジェクト名・コード・開始日を表示する
- フェーズ毎の進捗一覧を表示する
- プロジェクトメンバー一覧を表示する
- 会議体一覧を表示する（空の場合は空状態文言を表示する）
- 全体進捗状況（完了/進行中/未着手）を表示する
- プロジェクト計画（折りたたみセクション）を表示する
- 指定 `id` が存在しない場合は not found 表示を行う

## 関連資料

- [Copilot SSOT 入口](../../.github/copilot/00-index.md)
- [実装計画](../../.github/copilot/plans/81-page-project-details.md)
