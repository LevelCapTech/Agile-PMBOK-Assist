import { expect, test } from "@playwright/test";

test("home page shows the Next.js heading", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Next.js is working!" }),
  ).toBeVisible();
});
