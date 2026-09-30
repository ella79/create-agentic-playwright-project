import { test, expect } from "@fixtures/testFixtures.js";

/**
 * Visual regression example. Baseline is created on first run and lives next to
 * this spec (home.visual.spec.ts-snapshots/). Generate baselines on Linux
 * (yarn snapshots:linux). Mask dynamic regions so a diff means a real change.
 * Docs: https://playwright.dev/docs/test-snapshots
 */
test.describe("home page @visual", () => {
  test("matches the visual baseline", async ({ homePage, page }) => {
    await homePage.gotoHomePage();
    await expect(page).toHaveScreenshot("home-vr.png", {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    });
  });
});
