import { test, expect } from "@playwright/test";

test.describe("Navigation & Layout", () => {
  test("home page loads and shows DesignForge branding", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/DesignForge/i);
    await expect(page.getByRole("link", { name: /DesignForge/i }).first()).toBeVisible();
  });

  test("sidebar navigation links are visible on desktop", async ({ page }) => {
    await page.goto("/docs/button");
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.getByRole("link", { name: /Button/i }).first()).toBeVisible();
  });

  test("mobile hamburger opens sidebar", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/docs/button");
    const hamburger = page.getByRole("button", { name: /menu|open/i }).first();
    if (await hamburger.isVisible()) {
      await hamburger.click();
      await expect(page.getByRole("navigation").first()).toBeVisible();
    }
  });

  test("theme toggle switches between light and dark mode", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const themeToggle = page.getByRole("button", { name: /theme|dark|light/i }).first();

    if (await themeToggle.isVisible()) {
      const initialClass = await html.getAttribute("class");
      await themeToggle.click();
      await page.waitForTimeout(200);
      const newClass = await html.getAttribute("class");
      expect(initialClass).not.toBe(newClass);
    }
  });

  test("theme preference persists on reload", async ({ page }) => {
    await page.goto("/");
    const themeToggle = page.getByRole("button", { name: /theme|dark|light/i }).first();

    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(200);
      const classAfterToggle = await page.locator("html").getAttribute("class");
      await page.reload();
      await page.waitForLoadState("networkidle");
      const classAfterReload = await page.locator("html").getAttribute("class");
      expect(classAfterReload).toBe(classAfterToggle);
    }
  });
});
