import { test as setup, expect } from "@playwright/test";
import { url } from "../url.js";

/**
 * Auth setup project. Signs in once and saves the storage state, so the e2e project
 * can start already signed in instead of logging in per test. Wire it via the
 * `setup` project + `storageState` in playwright.config.ts. Fill in real selectors
 * and credentials (from env, never hardcoded) for your app.
 * Docs: https://playwright.dev/docs/auth
 */
const STORAGE_STATE = ".auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto(url.login);
  // Example - adapt to your app and read secrets from the environment:
  // await page.getByLabel("Email").fill(process.env.TEST_EMAIL ?? "");
  // await page.getByLabel("Password").fill(process.env.TEST_PASSWORD ?? "");
  // await page.getByRole("button", { name: /log in/i }).click();
  // await expect(page.getByRole("banner")).toContainText(/logged in/i);
  await expect(page).toHaveURL(/.*/);
  await page.context().storageState({ path: STORAGE_STATE });
});
