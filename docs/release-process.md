# 日付ベース Release 手順

## 概要

- workflow: `.github/workflows/release-date.yml`
- 実行方法: GitHub Actions の `Release (Date-based)` を `workflow_dispatch` で起動
- タグ形式: `YYYY.MM.DD`（同日 2 回目以降は `YYYY.MM.DD-2`, `YYYY.MM.DD-3` ... のように枝番をインクリメント）
- 生成物: GitHub Release + Release Notes + `next-bundle.tgz`

## 実行手順

1. GitHub Actions から `Release (Date-based)` を選択する。
2. `release_date` に JST 日付（`YYYY.MM.DD`）を入力して実行する。
3. Conventional Commits に準拠していないコミットがある場合は修正する。

## 成果物と検証

- 作成される Release asset は `next-bundle.tgz`。
- bundle 構成は次を満たす。
  - `server.js`
  - `.next/`（`cache` は除外）
  - `.next/static`
  - `.next/BUILD_ID`
  - `.next/required-server-files.json`
  - `.next/routes-manifest.json`
  - `.next/prerender-manifest.json`
  - `.next/build-manifest.json`
  - `.next/server/pages-manifest.json`
  - `.next/server/app-paths-manifest.json`
  - `public`
  - `package.json`
- bundle の確認は以下で行う。
  - `tar -tzf next-bundle.tgz`

## 失敗時の代表例

- commitlint 失敗: Conventional Commits に修正して再実行する。
- build 失敗: `next build` のエラーを解消して再実行する。
- 同名 tag / Release が存在: 既存を削除するか、枝番タグで再実行する。
- `server.js` 不在: `.next/standalone` の生成を確認する。
