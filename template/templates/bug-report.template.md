# [BUG] <concise title: what breaks, where>

- **Environment:** <BASE_URL, browser/project, build/commit, date>
- **Severity:** <blocker | critical | major | minor> **Priority:** <high | medium | low>
- **Traceability:** <STORY-001 / AC2, or the failing test path if exploratory>
- **Failing test:** <tests/e2e/....spec.ts :: test name>

## Preconditions

- <seed state, account, feature flags needed to reproduce>

## Steps to reproduce

1. <step, from the real test actions>
2. <step>
3. <step>

## Expected result

- <what the acceptance criterion / plan says should happen>

## Actual result

- <what actually happened: the failed assertion, the error, the observed state>

## Attachments

- Screenshot: <test-results/.../test-failed-1.png>
- Trace: <test-results/.../trace.zip> (open with `yarn playwright show-trace <path>`)
- Video: <test-results/.../video.webm>

> Grounding: every field above reflects what actually happened. Steps come from the
> real test, Actual from the real failure, attachments are the real Playwright
> artifacts. Expected comes from the requirement/plan. Nothing here is invented.
