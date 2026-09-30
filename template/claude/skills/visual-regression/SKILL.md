---
name: visual-regression
description: Add or maintain a stable visual regression test in this Playwright suite. Use when a screen's appearance matters and you want to catch unintended visual change.
---

# Visual regression skill

Visual tests catch what functional tests miss: layout, spacing, unintended
style change. They are only useful if a diff means a real change, not noise.

## Add a visual test

1. Put it in `tests/visual/<name>.visual.spec.ts` and tag it `@visual`.
2. Reach a deterministic state via a page object, then:
   `await expect(page).toHaveScreenshot("<name>.png", { animations: "disabled", maxDiffPixelRatio: 0.01 });`
3. First run creates the baseline. Commit the baseline next to the spec in the default `<spec>-snapshots/` folder after reviewing it.

## Keep it stable

- Disable animations; mask dynamic regions (dates, avatars, ads) with `mask: [locator]`.
- Pin viewport and device via the `visual` project in `playwright.config.ts`.
- Keep snapshots small and focused; full-page shots break on any change.

## Baselines must be Linux

Snapshots carry the platform in the name (`home-vr-linux.png`) and sit next to their spec. CI and Docker run on
Linux, so a baseline made on macOS or Windows will always mismatch there (fonts and
antialiasing differ). Generate baselines on Linux:

- `yarn snapshots:linux` - runs the update inside the official Playwright Linux image
  (Docker), so the committed baselines match CI. Then review and commit the files
  in the `<spec>-snapshots/` folders next to each visual spec.
- Or run `yarn test:visual:update` when you are already on Linux (or in the container).
  Never commit a baseline generated on your host OS if CI is Linux.

## Updating baselines

- Only after a real, intended UI change: `yarn playwright test tests/visual --update-snapshots`, then review the diff before committing.
- Never update snapshots to force a green run; that hides regressions.
