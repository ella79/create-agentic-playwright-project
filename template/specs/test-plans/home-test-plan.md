# Home - functional test plan

One plan per area, per type (functional here; visual in vr-test-plans/, API in
api-test-plans/). Test cases are numbered and live in a table. To add coverage,
extend this table with the next free TC id - never open a second file for this area.

## Metadata

| Field        | Value                                     |
| ------------ | ----------------------------------------- |
| Page URL     | `/`                                       |
| Spec file    | `tests/e2e/home.spec.ts`                  |
| Page object  | `utils/pageObjects/HomePage.ts`           |
| Precondition | Seed reaches a known state (seed.spec.ts) |

## Test cases

| ID    | Title                                      | Type  | Traceability  | Expected                                                      |
| ----- | ------------------------------------------ | ----- | ------------- | ------------------------------------------------------------- |
| TC-01 | Home shows a heading and starts onboarding | happy | STORY-001/AC1 | A level-1 heading is visible; "get started" navigates onward  |
| TC-02 | Header differs for guest vs signed-in      | happy | -             | Signed-in header shows the account state; guest shows sign-in |

## Out of scope

- Personalized/authenticated home content.
