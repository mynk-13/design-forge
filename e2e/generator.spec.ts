import { test, expect } from "@playwright/test";

test.describe("AI Generator", () => {
  test("generator page loads", async ({ page }) => {
    await page.goto("/generator");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("generator page has correct title", async ({ page }) => {
    await page.goto("/generator");
    const title = await page.title();
    expect(title).toMatch(/Generator.*DesignForge|DesignForge.*Generator|AI/i);
  });

  test("generator has a prompt input area", async ({ page }) => {
    await page.goto("/generator");
    await page.waitForLoadState("networkidle");
    const textarea = page.getByRole("textbox").first();
    const input = page.locator("input[type='text'], textarea").first();
    const hasTextarea = await textarea.isVisible().catch(() => false);
    const hasInput = await input.isVisible().catch(() => false);
    expect(hasTextarea || hasInput).toBeTruthy();
  });
});
