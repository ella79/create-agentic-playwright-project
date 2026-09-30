---
name: evals
description: Run and extend the evals gate that checks agent-generated tests before CI. Use before merging any agent-written test, and when adding new quality rules.
---

# Evals skill

The evals gate (`yarn evals`, source in `evals/run-evals.ts`) is the human gate
as code: cheap, deterministic checks over the tests agents produce. Green here
means the tests are trustworthy, not just that they compiled.

## Run it

- `yarn evals` - scans `tests/` and `src/`, applies each check, exits non-zero on failure.
- CI runs it before the Playwright run, so a bad test never reaches the suite.

## Built-in checks

- no `test.only` left in source
- no `waitForTimeout` (flaky; wait on state)
- every test has an `expect(...)`
- no raw `page.locator(...)` inside a test (use page objects)

## Add a check

Edit `evals/run-evals.ts` and push to the `checks` array:
`{ name: "...", run: (file, src) => problem ? "message" : null }`.
Keep checks deterministic and fast. For agent-behavior evals (did the agent pick
the right tool, did it regress after a prompt change), grade the outcome, not the
path, and pull real cases from failures.
