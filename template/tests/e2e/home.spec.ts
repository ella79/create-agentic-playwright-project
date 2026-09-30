import { test, expect } from "@fixtures/testFixtures.js";

/**
 * E2E example. Uses the HomePage fixture and asserts on behavior, not markup.
 * gotoHomePage() navigates via the url map and asserts the page loaded.
 */
test.describe("home page", () => {
  test("shows a heading and can start onboarding", async ({ homePage, page }) => {
    await homePage.gotoHomePage();
    expect(await homePage.headingText()).not.toEqual("");
    await homePage.startOnboarding();
    await expect(page).toHaveURL(/.+/);
  });
});
