import { test as base, expect } from "@playwright/test";
import { HomePage } from "@pageObjects";

/**
 * Fixtures wire page objects into the test signature, so a spec names the surfaces
 * it touches - async ({ homePage }) - and Playwright builds only those. The UI page
 * objects are shared by the e2e (functional) and visual (VR) tests. API tests use
 * Playwright's `request` directly and do not go through here.
 * Docs: https://playwright.dev/docs/test-fixtures
 */
type Fixtures = {
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
