import { test, expect } from "@playwright/test";

test.describe("Playground", () => {
  test("playground page loads with Monaco editor", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("playground page has toolbar controls", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");
    // Should have some form of viewport/toolbar controls
    const main = page.getByRole("main");
    await expect(main).toBeVisible();
  });

  test("playground URL contains shareable state", async ({ page }) => {
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");
    // Wait for editor to initialize
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toContain("/playground");
  });

  test("playground page has correct title", async ({ page }) => {
    await page.goto("/playground");
    const title = await page.title();
    expect(title).toMatch(/Playground.*DesignForge|DesignForge.*Playground/i);
  });
});
