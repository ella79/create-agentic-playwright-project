---
name: test-status
description: Keep specs/STATUS.md in sync with reality after a test run - update pass/fail/flaky/skip counts from the JSON report, and flag new, renamed or removed specs and plans. Use after running the suite or adding coverage.
---

# Test-status skill

`specs/STATUS.md` is the human-readable coverage report. It is a convention, not a
Playwright feature: the machine-readable truth is the reporters
(https://playwright.dev/docs/test-reporters). So counts here are always derived from a
real run, never hand-guessed.

## Source of results

`playwright.config.ts` writes `reports/results.json` (JSON reporter) and
`reports/junit.xml` on every run. Read `reports/results.json` to get, per spec file
and per test: passed / failed / flaky / skipped, and the total.

## Update STATUS.md after a run

1. Run the suite (or the relevant project). It produces `reports/results.json`.
2. For each plan area, read the real counts from the JSON and fill the row
   (Cases, Implemented, Passed, Failed, Flaky, Skipped). Update the totals.
3. Set the "Updated" line to today's date.
4. Never write a number the report does not support. If a spec did not run, say so.

## Detect drift (new / renamed / removed)

Compare what exists on disk with STATUS.md:

- A spec in `tests/` with no row -> a new feature/spec was added: add its row and
  point the planner at writing/aligning its plan.
- A row whose spec path no longer resolves -> the spec was renamed or removed:
  update or remove the row (and, for VR, its baseline).
- A plan in `specs/**` with no matching spec -> planned but not implemented: mark
  Implemented as 0 and hand to the generator.
  Record what changed under "Drift" in STATUS.md.

## Rules

- Counts come from `reports/results.json`, not from memory.
- Do not mark a case Passed on a test made green the wrong way (see `reviewer`/`healer`).
- Keep STATUS.md as the last step of a run, so it ends matching reality.
