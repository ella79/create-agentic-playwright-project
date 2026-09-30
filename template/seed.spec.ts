import { test } from "@playwright/test";

/**
 * Seed test for the Playwright agents workflow. The planner runs this first to
 * establish app context (a logged-in state, a known route) before it explores
 * and writes a plan. Keep it minimal: reach a stable starting point.
 * Docs: https://playwright.dev/docs/test-agents
 */
test("seed: reach a known starting state", async ({ page }) => {
  await page.goto("/");
  // Add sign-in or data setup here so generated tests start from a real state.
});
