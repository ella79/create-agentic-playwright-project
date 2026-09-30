# 2. Use the Page Object Model with role-based locators

Date: at project setup

## Status

Accepted

## Context

Tests that embed selectors break on every markup change and read as clicks, not
behavior. Playwright recommends the Page Object Model and user-facing locators.

## Decision

Selectors and page actions live in `utils/pageObjects` (page objects extending
`BaseAppPage` / `BaseComponentPage`), injected into tests via fixtures in `utils/fixtures/testFixtures.ts`. Tests
call intent methods and assert outcomes. Locators use `getByRole`/`getByLabel`,
not CSS/XPath. No `waitForTimeout`.

## Consequences

- A markup change is fixed in one page object, not across many tests.
- The evals gate enforces "no raw page.locator in tests".
- New pages follow `templates/PageObject.template.ts`.

## References

- https://playwright.dev/docs/pom
- https://playwright.dev/docs/best-practices
