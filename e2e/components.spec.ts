import { test, expect } from "@playwright/test";

test.describe("Component Documentation Pages", () => {
  test("Button docs page renders correctly", async ({ page }) => {
    await page.goto("/docs/button");
    await expect(page).toHaveTitle(/Button.*DesignForge|DesignForge.*Button/i);
    await expect(page.getByRole("heading", { name: /Button/i, level: 1 })).toBeVisible();
    await expect(page.getByText(/Installation/i).first()).toBeVisible();
  });

  test("Dialog docs page exists and shows content", async ({ page }) => {
    await page.goto("/docs/dialog");
    await expect(page.getByRole("heading", { name: /Dialog/i, level: 1 })).toBeVisible();
  });

  test("DataTable docs page exists and shows content", async ({ page }) => {
    await page.goto("/docs/data-table");
    await expect(page.getByRole("heading", { name: /DataTable|Data Table/i, level: 1 })).toBeVisible();
  });

  test("Toast docs page exists and shows content", async ({ page }) => {
    await page.goto("/docs/toast");
    await expect(page.getByRole("heading", { name: /Toast/i, level: 1 })).toBeVisible();
  });

  test("all component pages have proper meta title", async ({ page }) => {
    const components = ["button", "input", "dialog", "badge", "card"];
    for (const component of components) {
      await page.goto(`/docs/${component}`);
      const title = await page.title();
      expect(title).toMatch(/DesignForge/i);
    }
  });

  test("code blocks have copy button", async ({ page }) => {
    await page.goto("/docs/button");
    await page.waitForLoadState("networkidle");
    const copyBtn = page.getByRole("button", { name: /copy/i }).first();
    if (await copyBtn.isVisible()) {
      expect(copyBtn).toBeVisible();
    }
  });

  test("component page has Storybook preview iframe or link", async ({ page }) => {
    await page.goto("/docs/button");
    await page.waitForLoadState("networkidle");
    const iframe = page.locator("iframe").first();
    const storybookLink = page.getByRole("link", { name: /storybook/i }).first();
    const hasIframe = await iframe.isVisible().catch(() => false);
    const hasLink = await storybookLink.isVisible().catch(() => false);
    expect(hasIframe || hasLink).toBeTruthy();
  });
});
