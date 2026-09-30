import { test, expect } from "@playwright/test";

/**
 * API example. Playwright's request context tests the backend directly, no browser
 * and no page object - the test lives in this file. Check the outcome (status, body
 * shape), and validate against your OpenAPI/GraphQL schema where you have one.
 * Docs: https://playwright.dev/docs/api-testing
 */
test.describe("api @api", () => {
  test("health endpoint returns ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json().catch(() => ({}));
    expect(body).toBeDefined();
  });
});
