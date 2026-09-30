---
description: Update specs/STATUS.md from the latest run and report coverage drift (new, renamed or removed specs/plans).
argument-hint: (optional) an area to focus on, e.g. home
---

Refresh coverage for **$ARGUMENTS** (or the whole suite if empty). Follow the
`test-status` skill.

1. Run the suite (or the area's project) so `reports/results.json` is current. If a
   fresh run is not wanted, read the existing `reports/results.json` instead.
2. Update `specs/STATUS.md`: fill each row's Cases/Implemented/Passed/Failed/Flaky/
   Skipped from the JSON report, update totals, set the Updated date. Never invent a
   number the report does not support.
3. Detect drift: a spec with no row (new feature), a row whose spec is gone (renamed/
   removed), a plan with no spec (not implemented). List these under "Drift" and say
   which need the planner or generator.
4. Report a short summary: totals per suite, and any drift found.
