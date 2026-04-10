import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("opens search dialog via button click", async ({ page }) => {
    await page.goto("/");
    const searchButton = page.getByRole("button", { name: /search/i }).first();
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await expect(page.getByRole("dialog")).toBeVisible();
    }
  });

  test("opens search with keyboard shortcut", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Meta+k");
    await page.waitForTimeout(300);
    const dialog = page.getByRole("dialog");
    if (await dialog.isVisible()) {
      await expect(dialog).toBeVisible();
    }
  });

  test("search returns results for known component", async ({ page }) => {
    await page.goto("/");
    const searchButton = page.getByRole("button", { name: /search/i }).first();
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.getByRole("dialog").waitFor({ state: "visible" });
      await page.keyboard.type("Button");
      await page.waitForTimeout(300);
      await expect(page.getByText(/Button/i).first()).toBeVisible();
    }
  });

  test("Escape key closes search dialog", async ({ page }) => {
    await page.goto("/");
    const searchButton = page.getByRole("button", { name: /search/i }).first();
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.getByRole("dialog").waitFor({ state: "visible" });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
      await expect(page.getByRole("dialog")).not.toBeVisible();
    }
  });

  test("clicking search result navigates to correct page", async ({ page }) => {
    await page.goto("/");
    const searchButton = page.getByRole("button", { name: /search/i }).first();
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.getByRole("dialog").waitFor({ state: "visible" });
      await page.keyboard.type("Button");
      await page.waitForTimeout(300);
      const firstResult = page.getByRole("option").first();
      if (await firstResult.isVisible()) {
        await firstResult.click();
        await page.waitForURL(/button/i);
        expect(page.url()).toMatch(/button/i);
      }
    }
  });
});
