# モノレポ構成定義 — CopilotAgent 参照用

> **NOTE:** 本書は Copilot Agent が自動解析する構成定義レイヤの SSOT。  
> 規範表現は MUST / SHOULD / MUST NOT を使用し、各箇条には `RULE:` / `DO NOT:` / `EXAMPLE:` / `NOTE:` タグを付与する。`RULE:` は MUST、`DO NOT:` は MUST NOT に相当する。  
> スコープは本リポジトリ内のモノレポ（複数アプリ混在）運用。コード例・コマンドは直接利用可能な最小形を維持する。`<repo_name>` はワークスペース上のリポジトリ名プレースホルダ（例: `myproject`）。

---

## 1. 目的と適用範囲
- RULE: 本書は `.github/copilot-instructions.md`（リポジトリに存在）から include される構成定義レイヤであり、モノレポのディレクトリ設計・ビルド・デプロイ・テストの単一情報源となる。
- RULE: 対象は「リポジトリルートを起点とする apps / packages / deploy / scripts / credentials」。他ファイルへ影響を及ぼさない。
- NOTE: 互換性重視。既存のコード例・コマンドは保持しつつ重複を統合して再構成する。

---

## 2. 基本原則（パス・ビルド・多言語）
- RULE: VPS へ `git clone` して展開する前提とし、Docker / docker-compose を利用しない。
- RULE: `.env` は起動時に読み込む。ビルド時には混ぜない。
- RULE: アプリごとの世界は `apps/web/<app>` に分離する（Next.js / React / TypeScript）。共通コードは `packages/<pkg>` に集約する。
- RULE: 起動は `npm run <script>` に統一し、直叩きコマンドの分散を防ぐ。
- DO NOT: `../` で apps/packages を横断する相対 import を許可しない。TypeScript paths を単一情報源にする。

---

## 3. 標準ディレクトリ構成（推奨テンプレ）

### 3.1 リポジトリ全体（Next.js + 共通 + env）
```text
repo-root/
├── .env
├── .env.dev
├── .env.stg
├── .env.prod
│
├── apps/
│   └── web/
│       ├── app1/
│       │   ├── app/                  # Next.js App Router
│       │   ├── public/
│       │   ├── src/
│       │   ├── tests/
│       │   └── package.json
│       │
│       └── admin/
│           ├── app/
│           ├── public/
│           ├── src/
│           ├── tests/
│           └── package.json
│
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   └── package.json
│   └── shared/
│       ├── src/
│       └── package.json
│
├── deploy/
│   └── vps/
│       ├── systemd/
│       │   ├── app1.service
│       │   └── admin.service
│       └── README.md
│
```

---

## 4. VPS 展開（systemd 方式）
- RULE: VPS では systemd で常駐させ、再起動・ログ・起動順を管理する。
- RULE: systemd から起動するコマンドは `npm run start` に統一する。
- RULE: `.env` は systemd の `EnvironmentFile` で読み込む。
- EXAMPLE: systemd ユニット（app1）
```ini
# deploy/vps/systemd/app1.service
[Unit]
Description=Next.js app1
After=network.target

[Service]
Type=simple
WorkingDirectory=/srv/<repo_name>/apps/web/app1
EnvironmentFile=/srv/<repo_name>/.env.prod
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5
User=deploy

[Install]
WantedBy=multi-user.target
```
- DO NOT: systemd から `next start` を直叩きする。

---

## 5. packages & TypeScript paths（単一方針）
- RULE: 共通コードは `packages/<pkg>` に集約し、アプリからはパッケージ名で参照する。
- RULE: `tsconfig.base.json` の `paths` を単一情報源とし、相対パスでの跨ぎ import を禁止する。
- RULE: 実行は `npm run <script>` に統一し、実行ディレクトリ依存を排除する。
```text
packages/
├── shared/
│   └── src/index.ts
└── ui/
    └── src/index.ts
apps/web/
└── app1/
    └── src/pages/index.tsx
```
```json
// tsconfig.base.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@repo/shared": ["packages/shared/src/index.ts"],
      "@repo/ui": ["packages/ui/src/index.ts"]
    }
  }
}
```
```bash
# EXAMPLE: ローカル開発
cd apps/web/app1 && npm run dev
```

---

## 6. テスト戦略（Vitest/Jest 一括）
- RULE: プロジェクトルートで `vitest` / `jest` を実行する。`packages/` と `apps/` を同一設定で探索する。
- RULE: `tests/` または `*.test.ts(x)` 規約を統一し、探索範囲を `apps/web` と `packages` に固定する。
- RULE: E2E は Playwright で重要フローを最小限カバーし、ユニット/統合テストと役割分担する。
```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["apps/web/**/?(*.)+(test).[tj]sx?", "packages/**/?(*.)+(test).[tj]s?"],
    environment: "jsdom"
  }
});
```
```bash
# scripts/test-web.sh（単一情報源）
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

npx vitest run
```
- RULE: CI 品質ゲート（PR）は Lint + Unit Test + Security を必須とし、CD でも Unit を再実行する。
- EXAMPLE: GitHub Actions（unit 抜粋）
```yaml
- name: Unit tests (single source)
  run: |
    chmod +x scripts/test-web.sh
    ./scripts/test-web.sh
```

---

## 7. 認証情報/credentials 運用
- RULE: 認証ファイルは `.env` に直接書かず、`credentials/<env>/...` に配置して Git へコミットしない（`.gitignore` 必須）。README と `.sample` のみ Git 許可。
- RULE: `.env` には「パスのみ」を定義する。
- RULE: 秘密鍵/証明書は 600、ディレクトリは 700 権限にする。
- EXAMPLE: systemd でのパス固定
```ini
EnvironmentFile=/srv/<repo_name>/.env.prod
```
- RULE: CI では `credentials/` を持ち込まず、Secrets からファイルを生成して同一パスに置く。
```yaml
- name: Write GCP credentials
  run: |
    mkdir -p /tmp/credentials/gcp
    echo '${{ secrets.GCP_SA_JSON }}' > /tmp/credentials/gcp/service-account.json
    chmod 600 /tmp/credentials/gcp/service-account.json
```
- NOTE: 最終形は Secret Manager / IAM Role / Workload Identity などファイルレス運用を推奨。

---

## 8. Dependabot（モノレポ混在対応）
- RULE: `.github/dependabot.yml` をリポジトリルート1箇所に置き、エコシステム × ディレクトリ単位で `updates` を分割する。
- RULE: `open-pull-requests-limit` と `groups` を必ず設定し、PR洪水を防ぐ。ラベルは `dependencies` + `deps-js` + `area-<app>` を付与する。
- RULE: 週次更新を基本とし、Security updates は優先レビュー（`security` ラベル）。
```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule: { interval: "weekly", day: "monday", time: "03:00", timezone: "Asia/Tokyo" }
    labels: ["dependencies", "deps-actions"]
    open-pull-requests-limit: 5
    groups:
      actions:
        patterns: ["*"]
  - package-ecosystem: "npm"
    directory: "/apps/web/app1"
    schedule: { interval: "weekly", day: "monday", time: "03:10", timezone: "Asia/Tokyo" }
    labels: ["dependencies", "deps-js", "area-app1"]
    open-pull-requests-limit: 5
    groups:
      js-devtools-app1:
        patterns: ["vitest*", "eslint*", "typescript", "prettier*"]
      js-runtime-app1:
        patterns: ["*"]
        exclude-patterns: ["vitest*", "eslint*", "typescript", "prettier*"]
```
- DO NOT: `directory` を依存ファイルの無い場所に向ける / PR 上限なしで運用する。

---

## 9. CI/CD とデプロイ
- RULE: ワークフローは領域別に分割する（例: `web-ci.yml`, `release-vps.yml`）。`paths` で無駄実行を減らす。
- RULE: リリースフローは `unit` → `build` → `deploy` の順で、`deploy` は `needs: [unit, build]` を必須とする。
- EXAMPLE: release-vps 骨子
```yaml
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: chmod +x scripts/test-web.sh && ./scripts/test-web.sh
  build:
    needs: unit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run build
  deploy:
    needs: [unit, build]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/deploy-vps.sh prod
```
- RULE: VPS へのデプロイは `scripts/deploy-vps.sh` に集約し、SSH/rsync/pm2/systemd の方式はスクリプトに閉じ込める。
- RULE: `scripts/` に up/down/logs/test/deploy の入口を集約し、CI も同じスクリプトを呼ぶ。
- EXAMPLE: Makefile（起動とテストの固定化）
```make
.PHONY: up-dev down test deploy
up-dev:
	npm run dev

down:
	echo "Stop via systemd on VPS"

test:
	chmod +x ./scripts/test-web.sh && ./scripts/test-web.sh

deploy:
	chmod +x ./scripts/deploy-vps.sh && ./scripts/deploy-vps.sh prod
```

---

## 10. 多言語共存
- RULE: 言語/領域ごとに世界を分離する（Web: `apps/web`, API: `apps/api`, Mobile: `apps/mobile`）。
- RULE: CI ジョブも領域ごとに分け、チェック名に領域を含める（例: `web-ci`, `api-ci`, `mobile-ci`）。
- NOTE: モバイルや API は別ランタイムのため、ビルド / デプロイ手順は分離する。

---

## 11. 補助ファイル（運用の単一情報源）
- RULE: `.npmrc` や `.nvmrc` で Node.js / npm のバージョンを固定する。
- RULE: `scripts/` 配下に `test-web.sh`, `deploy-vps.sh` などを集約し、CI/ローカルが同一入口を使う。
- RULE: `credentials/README.md` で取得・配置・権限・注入パスを明記する。
- NOTE: `schema/` に OpenAPI / JSON Schema / Protobuf を置き、言語跨ぎの共通仕様をコードではなく仕様で共有する。

---

## 12. 最小チェックリスト
- [ ] VPS 展開で Docker を使わないことを明記している。
- [ ] `.env` は起動時に読み込み、ビルドへ混ぜない。
- [ ] 起動は `npm run <script>` に統一されている。
- [ ] テストはリポジトリルートで実行し、`apps/web` / `packages` を探索対象に含める。
- [ ] credentials は Git へ入れず、パスのみ `.env` に記載。
- [ ] Dependabot は groups + PR 上限付きでエコシステム別に分割。
- [ ] CI/CD は scripts/ を入口にし、unit → build → deploy の順でゲートする。

---

## 13. アンチパターンと対処
- DO NOT: `../packages` を相対 import する
  → 対処: TypeScript paths を単一情報源に固定。
- DO NOT: systemd で `next start` を直叩きする
  → 対処: `npm run start` に統一する。
- DO NOT: PR 上限なしの Dependabot 運用
  → 対処: groups + `open-pull-requests-limit` を必ず設定。
- DO NOT: credentials を `.env` や Git に埋め込む
  → 対処: パスだけを `.env` に記載し、権限を 600/700 に設定。

---

## 14. Wiki 貼り付け用ショート宣言
```text
【運用宣言】
1) VPS への clone 展開を前提とし、Docker は使わない。
2) .env は起動時に読み込む（ビルドに混ぜない）。
3) 起動は `npm run <script>` に統一し、直叩きを禁止する。
4) 共通コードは packages/ に置き、TypeScript paths を単一情報源に統一する。
5) CI はリポジトリルートから vitest/jest を実行し、apps/web と packages を探索対象に含める。
7) 多領域共存（Web/API/Mobile）は領域ごとに apps/<area>/ で世界を分け、CI もジョブを分ける。
```

---

## 15. リポジトリ完全テンプレ（圧縮版）
> NOTE: “common + パス + CI” で必要な資材を一箇所にまとめた統合版。`...` は配下に増えることを示す。
```text
repo-root/
├── .env(.dev|.stg|.prod|.example)
├── .nvmrc
├── Makefile
├── .github/
│   ├── workflows/
│   ├── dependabot.yml
│   ├── CODEOWNERS
│   ├── copilot-instructions.md
│   └── copilot/**
├── scripts/
│   ├── test-web.sh
│   ├── deploy-vps.sh
│   └── ...
├── credentials/
│   ├── dev/
│   ├── stg/
│   └── prod/                              # 認証ファイル本体は Git 禁止、README のみ許容
├── schema/
│   ├── openapi.yaml
│   ├── events.proto
│   └── ...
├── deploy/
│   └── vps/
│       ├── systemd/
│       └── README.md
├── apps/
│   └── web/
│       ├── app1/
│       └── admin/
├── packages/
│   ├── shared/
│   └── ui/
└── tests/ (共通E2Eなど全体テストが必要な場合のみ)
```

---

## 16. 事故発生時の即時チェック
- RULE: `Cannot find module` → tsconfig paths / package.json の依存関係が解決できているか確認する。
- RULE: テスト探索が遅い → `vitest.config.ts` / `jest.config.js` の `include` / `testMatch` を固定。
- RULE: CI でのみ落ちる → CI も `scripts/test-web.sh` を呼んでいるか確認し、同一 Node.js バージョンに揃える。
- RULE: credentials パスずれ → `.env` と参照パスの整合を確認。

---

## 17. 用語・プロファイル命名規約
- RULE: ラベル/チェック名/ジョブ名には領域を含める（例: `deps-js`, `area-app1`, `web-ci`）。

---

## 18. 参考コマンド集（再掲）
```bash
# 起動
cd apps/web/app1
npm run dev

# テスト
npx vitest run

# Node.js バージョン確認
node -v
```

---

## 19. セキュリティ補足
- RULE: secrets/credentials をログに出さない。CI ではマスクする。
- RULE: `.env.prod` に機密を直書きしない。必要なら別配布 or CI 注入に切り替える。
- RULE: systemd で監査ログ（日時/ユーザ/SHA）を出力できるように `scripts/deploy-vps.sh` で記録する。

---

## 20. 変更ポリシー
- RULE: 本書を更新する場合は「重複排除・MUST/SHOULD 整理・タグ付け」を維持し、include 構造を壊さないこと。
- RULE: 構成変更は plan（`80-templates/implementation-plan.md`）で合意してから実施する。
