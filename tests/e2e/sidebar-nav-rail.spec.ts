import { expect, test } from "@playwright/test";

test("sidebar rail state persists after navigation", async ({ page }) => {
  await page.goto("/dashboard");

  const sidebar = page.getByRole("navigation", { name: "サイドナビゲーション" });
  await expect(sidebar).toHaveCSS("width", "256px");

  await page
    .getByRole("button", { name: "サイドバーを折りたたむ" })
    .click();

  await expect(sidebar).toHaveCSS("width", "72px");
  await expect(
    page.getByRole("button", { name: "サイドバーを展開する" }),
  ).toBeVisible();
  await expect(sidebar.getByText("メンバー")).toHaveCount(0);

  await page.getByRole("link", { name: "メンバー" }).click();
  await expect(page).toHaveURL(/section=members/);

  await page.reload();
  await expect(sidebar).toHaveCSS("width", "72px");
});
