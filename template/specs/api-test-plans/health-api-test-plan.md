# Health - API test plan

API plan, separate from UI plans. API tests hit the backend directly with
Playwright's `request` (no browser, no page object). Extend the table with the next
free API id; do not open a second file for this area.

## Metadata

| Field     | Value                          |
| --------- | ------------------------------ |
| Spec file | `tests/api/health.api.spec.ts` |
| Endpoint  | `GET /api/health` (no auth)    |

## Test cases

| ID     | Title                 | Type  | Expected                      |
| ------ | --------------------- | ----- | ----------------------------- |
| API-01 | Health endpoint is up | happy | 2xx response; body is defined |

## Edge cases

- Non-200 when a dependency is down; response-time budget.
