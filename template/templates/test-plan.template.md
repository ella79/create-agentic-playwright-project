# <Area> - <functional | visual | API> test plan

Copy to the right folder: functional -> `specs/test-plans/<area>-test-plan.md`,
visual -> `specs/vr-test-plans/<area>-vr-test-plan.md`, API ->
`specs/api-test-plans/<area>-api-test-plan.md`. One plan per area, per type.
Extend the table with the next free id; never open a second file for an area, and
never duplicate a case already listed. Grounded in Playwright best practices
(https://playwright.dev/docs/best-practices).

## Metadata

| Field       | Value                                              |
| ----------- | -------------------------------------------------- |
| Spec file   | `tests/<type>/<area>....spec.ts`                   |
| Page object | `utils/pageObjects/<area>/<name>Page.ts` (UI only) |

## Test cases

| ID    | Title            | Type  | Traceability     | Expected                       |
| ----- | ---------------- | ----- | ---------------- | ------------------------------ |
| TC-01 | <what it proves> | happy | STORY-<id>/AC<n> | <observable outcome to assert> |

(Use VR-01 for visual plans, API-01 for API plans.)

## Out of scope

- <what this plan does not cover>
