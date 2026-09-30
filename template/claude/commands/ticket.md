---
description: Read a Jira ticket, reproduce and fix the bug, then update the ticket when it is verified green.
argument-hint: <Jira issue key, e.g. PROJ-123>
---

Work Jira ticket **$ARGUMENTS** end to end. Follow the `jira-ticket` skill.

1. **Read** the ticket via the Jira MCP: summary, status, steps, environment, expected
   vs actual. Restate the defect. If no Jira MCP is configured, stop and say so.
2. **Reproduce**: write or find a test that fails on this bug (red first). Show it to me.
3. **Fix** at the source. Re-run until the reproducing test is green and `yarn test`,
   `yarn evals`, `yarn typecheck` pass.
4. **Update the ticket** - only after it is verified green, and only on my go-ahead:
   add a comment (what was wrong, what fixed it, the test/commit/PR as evidence) and
   transition the status using the transitions the ticket actually offers. Report the
   key and new status.

Rules: commenting and transitioning are real side effects - do them only when I
confirm. Never close a ticket on a test made green the wrong way. Ground every update
in what actually happened.
