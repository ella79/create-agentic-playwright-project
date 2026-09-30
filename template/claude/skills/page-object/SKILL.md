---
name: page-object
description: Add or extend a Page Object in this Playwright + TypeScript suite, using semantic locators in priority order. Use when a test needs a new page, a new element, or a new user action.
---

# Page Object skill

Selectors and page actions live here, never in tests.

## Locator priority (semantic first, in this order)

Playwright recommends user-facing locators over CSS/XPath, with test id as a
fallback (https://playwright.dev/docs/best-practices, /docs/locators). Reach for the
highest one that fits, so tests survive restyles.

1. `getByRole(role, { name })` - the default. What a user and assistive tech see.
2. `getByLabel` - form controls with a real label.
3. `getByPlaceholder` - form controls that only have a placeholder.
4. `getByText` - non-interactive content, and `<a>` without `href` (no link role).
5. `getByTestId` - the app's test attribute, mapped by `testIdAttribute` in
   `playwright.config.ts` (set it to your app's attribute: `data-testid`, `data-qa`,
   `data-component`, ...). Use it when a semantic locator does not fit, or when the
   app ships these attributes on purpose.
6. CSS or XPath - last resort only, and only with an inline comment saying why
   nothing above works.

```typescript
// No accessible name: icon-only control with no aria-label
readonly removeItem: Locator = row.locator(".cart_quantity_delete");
```

## Two base classes

- `BaseAppPage` - a URL-addressable page. Owns navigation (`goto()`) and shared
  chrome (header, footer). Set `readonly path`.
- `BaseComponentPage` - a component scoped to a `root` locator; every child resolves
  inside it, so two components sharing a label never cross-match. Use for modals,
  rows, cards.

## Add a new page

1. Create `utils/pageObjects/<area>/<name>Page.ts` extending `BaseAppPage` (or `BaseComponentPage`).
2. Set `readonly path` (relative to baseURL) for a page.
3. Declare locators as `private readonly` fields, resolved in the constructor by the
   priority above. Verify each resolves to exactly the intended element (Playwright MCP).
4. Expose intent methods (`login`, `search`, `addToCart`) that return meaningful
   values, not locators.
5. Register it in `utils/fixtures/testFixtures.ts` so tests receive it as a fixture.

## Rules

- One page object per screen or major component.
- Method names read as user intent, not implementation.
- No assertions inside page objects; tests assert.
- No raw `page.locator(...)` in a test - it belongs in a page object.
