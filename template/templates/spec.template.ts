import { test, expect } from "@fixtures/testFixtures.js";

/**
 * Test template. Copy to tests/e2e|visual|api/<name>.spec.ts.
 * Follows Playwright best practices: test user-visible behavior, use
 * web-first assertions, keep tests isolated, no waitForTimeout
 * (https://playwright.dev/docs/best-practices).
 *
 * Register the page object you need in utils/fixtures/testFixtures.ts and receive it
 * as a fixture parameter, e.g. { namePage }.
 */
test.describe("<feature>", () => {
  test("<does the expected thing>", async ({ page }) => {
    // Arrange: reach the starting state via a page object.
    // Act: perform the user action through intent methods.
    // Assert: check the observable outcome with a web-first assertion.
    await page.goto("/");
    await expect(page).toHaveTitle(/.+/);
  });
});
