import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration.
 * Docs: https://playwright.dev/docs/test-configuration
 *
 * One project per test type keeps concerns separate and lets CI shard them.
 * baseURL is read from the environment so the same suite runs against local,
 * staging or a preview deployment without code changes.
 */
export default defineConfig({
  testDir: "./tests",
  // Snapshots live next to their spec in the default `<spec>-snapshots/` folder,
  // named with the platform (e.g. home-vr-linux.png). Baselines must be generated
  // on Linux so they match Docker and CI - use `yarn snapshots:linux`.
  // Fail the build on CI if test.only is left in the source.
  forbidOnly: !!process.env.CI,
  // Every test must be independent (own state, no ordering), so they can run in any
  // order and in parallel. This is enforced by fullyParallel.
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? "100%" : undefined,
  // On CI each shard writes a blob report; the "report" job merges them into one
  // HTML + JSON. Locally, the usual set including reports/results.json for STATUS.md.
  reporter: process.env.CI
    ? [["blob"]]
    : [
        ["list"],
        ["html", { open: "never" }],
        ["junit", { outputFile: "reports/junit.xml" }],
        ["json", { outputFile: "reports/results.json" }],
      ],
  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    // getByTestId maps to this attribute. Point it at whatever your app ships:
    // "data-testid" (default), or "data-qa", "data-component", "data-test", etc.
    testIdAttribute: "data-testid",
    // Keep the full trace whenever a test fails (locally and on CI), so the
    // healer and reporter always have it. Open one with `yarn playwright show-trace`.
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    // Auth setup: signs in once and saves storage state (utils/setup/login.setup.ts).
    // The e2e project depends on it and reuses the state. Remove both if your app
    // needs no auth.
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "e2e",
      testDir: "./tests/e2e",
      use: {
        ...devices["Desktop Chrome"],
        // Reuse the signed-in state produced by the setup project.
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "visual",
      testDir: "./tests/visual",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "api",
      testDir: "./tests/api",
      // API tests need no browser UI.
      use: {},
    },
  ],
});
