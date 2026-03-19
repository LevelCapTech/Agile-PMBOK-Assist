import { expect, test } from "@playwright/test";

test("project details page shows main sections", async ({ page }) => {
  await page.goto("/projects/1");

  await expect(
    page.getByRole("heading", { name: "ECサイトリニューアルプロジェクト" }),
  ).toBeVisible();
  await expect(page.getByText("フェーズ毎の進捗")).toBeVisible();
  await expect(page.getByText("プロジェクトメンバー")).toBeVisible();
  await expect(page.getByText("会議体一覧")).toBeVisible();
  await expect(page.getByText("全体進捗")).toBeVisible();
  await expect(page.getByText("プロジェクト計画")).toBeVisible();
});

test("project details shows not found state", async ({ page }) => {
  await page.goto("/projects/9999");

  await expect(page.getByText("プロジェクトが見つかりません。")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "プロジェクト一覧に戻る" }),
  ).toBeVisible();
});
