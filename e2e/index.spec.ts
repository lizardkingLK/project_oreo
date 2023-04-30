// e2e/example.spec.ts
import { test, expect } from "@playwright/test";

test("should welcome by the index page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");

  // The page should contain an h1 with "OREO"
  await expect(page.locator("h1")).toContainText("OREO");

  // The page should contain navbar toggle
  await expect(page.locator("button#btnToggleNavbar")).toBeVisible();
});

test("should login to the system", async ({ page }) => {
  await page.goto("/");

  await page.click("button#btnToggleNavbar");

  await page.getByText("Login").click();

  await page.getByText("Sign in with Credentials").click();

  await expect(page).toHaveTitle("Sign In");

  await page.getByLabel("Email").fill("john@gmail.com");

  await page.getByLabel("Password").fill("john");

  await page.getByText("Sign in with Credentials").click();

  await expect(page).toHaveTitle("Oreo");

  await expect(page.locator("#textGreeting")).toContainText("Hello John Doe");
});
