// e2e/example.spec.ts
import { test, expect } from "@playwright/test";

test("should navigate to the login page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://127.0.0.1:3000/");

  // The page should contain an h1 with "OREO"
  await expect(page.locator("h1")).toContainText("OREO");

  // Find an element with the text 'LOGIN' and click on it
  await page.locator("a").nth(0).click();

  // The new URL should be "/signin" (baseURL is used there)
  await expect(page).toHaveURL("http://127.0.0.1:3000/api/auth/signin");
});
