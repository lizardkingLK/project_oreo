// e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('should welcome by the index page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');

  // The page should contain an h1 with "OREO"
  await expect(page.locator('h1')).toContainText('OREO');
});
