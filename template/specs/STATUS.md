# Test Status Report

Coverage of the test plans (`specs/test-plans/`, `specs/vr-test-plans/`,
`specs/api-test-plans/`) against the suites in `tests/`. Counts come from the JSON
reporter output (`reports/results.json`) of the run that produced them - never from a
guess. Agents update this file after every run (see the `test-status` skill and the
`/coverage` command).

Updated: at project setup

## Functional coverage

| #   | Feature plan                                      | Test                                      | Cases | Implemented | Passed | Failed | Flaky | Skipped |
| --- | ------------------------------------------------- | ----------------------------------------- | ----- | ----------- | ------ | ------ | ----- | ------- |
| 1   | [home-test-plan.md](test-plans/home-test-plan.md) | [home.spec.ts](../tests/e2e/home.spec.ts) | 2     | 1           | -      | -      | -     | -       |
|     | **Total**                                         |                                           | **2** | **1**       |        |        |       |         |

## API coverage

| #   | Feature plan                                                      | Test                                                  | Cases | Implemented | Passed | Failed | Flaky | Skipped |
| --- | ----------------------------------------------------------------- | ----------------------------------------------------- | ----- | ----------- | ------ | ------ | ----- | ------- |
| 1   | [health-api-test-plan.md](api-test-plans/health-api-test-plan.md) | [health.api.spec.ts](../tests/api/health.api.spec.ts) | 1     | 1           | -      | -      | -     | -       |
|     | **Total**                                                         |                                                       | **1** | **1**       |        |        |       |         |

## Visual regression coverage

| #   | Feature plan                                               | Test                                                       | Snapshots | Implemented | Passed | Failed | Flaky | Skipped |
| --- | ---------------------------------------------------------- | ---------------------------------------------------------- | --------- | ----------- | ------ | ------ | ----- | ------- |
| 1   | [home-vr-test-plan.md](vr-test-plans/home-vr-test-plan.md) | [home.visual.spec.ts](../tests/visual/home.visual.spec.ts) | 1         | 1           | -      | -      | -     | -       |
|     | **Total**                                                  |                                                            | **1**     | **1**       |        |        |       |         |

## Drift (new / renamed / removed since last update)

- None recorded yet. The `/coverage` command lists specs and plans that do not match.

## Open questions

- None.
