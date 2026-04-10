import { test, expect } from "@playwright/test";

test.describe("Visual Regression - Component Pages", () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }`,
    });
  });

  test("button page matches snapshot", async ({ page }) => {
    await page.goto("/docs/button");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("button-page.png", {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
  });

  test("home page matches snapshot", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("home-page.png", {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
  });

  test("badge page matches snapshot", async ({ page }) => {
    await page.goto("/docs/badge");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("badge-page.png", {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
  });
});
