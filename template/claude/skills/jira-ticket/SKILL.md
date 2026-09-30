---
name: jira-ticket
description: Read a Jira ticket by key, use it to drive a fix, and update the ticket (comment + status transition) once the fix is verified green. Use when given a Jira issue key like PROJ-123.
---

# Jira ticket skill

Read a ticket by key, work the fix against it, and close the loop on Jira - only when
the fix is actually verified. Needs a Jira MCP server configured (see
`templates/mcp.jira.example.json`; the Atlassian Remote MCP Server is the official one).

## Read the ticket

Given a key (e.g. `PROJ-123`), use the Jira MCP's get-issue tool to read: summary,
status, description, steps to reproduce, environment, and any attachments. Restate the
expected vs actual so the fix targets the real defect. Never guess fields the ticket
does not contain.

## Reproduce, then fix

1. Turn the ticket's steps into (or find) a failing test that reproduces the bug -
   red first, so the fix is proven, not assumed.
2. Fix at the source. Re-run until the reproducing test is green and the suite passes
   (`yarn test`, `yarn evals`, `yarn typecheck`).

## Update the ticket - only once it is verified

When the reproducing test passes and CI is green:

1. Add a comment via the Jira MCP: what was wrong, what fixed it, and the evidence
   (the test name/path, the commit or PR, the green run). Link the trace if useful.
2. Transition the status with the Jira MCP's transition tool (e.g. In Progress ->
   In Review or Done), using the transitions the ticket actually offers - read them
   first; do not invent a status.

## Rules

- Commenting and transitioning are real side effects: do them only after the fix is
  verified, and only when asked to update the ticket. Report the issue key and the new
  status back.
- Never mark a ticket fixed on a test made green the wrong way (see the `healer` and
  `reviewer` gates). Green must mean correct.
- Ground every update in what actually happened; never invent a fix, a test result or
  a status.

Sources:

- Atlassian Remote MCP Server: https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/
