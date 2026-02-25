import { expect, test } from "@playwright/test";

test("home page shows the dashboard link", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "ダッシュボードへ" }),
  ).toBeVisible();
});
