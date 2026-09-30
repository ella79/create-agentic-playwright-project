---
name: api-testing
description: Add an API test using Playwright's request context, and validate responses against a contract. Use when covering REST or GraphQL endpoints, or extending coverage below the UI.
---

# API testing skill

API tests check the backend directly, no browser. They are fast and stable and
catch defects the UI hides.

## Add a test

1. Put it in `tests/api/<name>.api.spec.ts`, tag `@api`.
2. Use the `request` fixture: `const res = await request.get("/api/...")`.
3. Assert the outcome: status (`res.ok()`, `res.status()`) and body shape.
4. Validate the contract where you have one: check the response against your
   OpenAPI/GraphQL schema, not just a few fields.

## Notes

- Set `baseURL` via `BASE_URL`; the `api` project in the config runs without a browser.
- For auth, obtain a token once (a fixture) and reuse it; do not log in through the UI for API tests.
- Test error paths (4xx/5xx), not only the happy path.
