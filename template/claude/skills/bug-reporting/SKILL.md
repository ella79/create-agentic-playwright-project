---
name: bug-reporting
description: Write a standard, Jira-ready bug report from a confirmed real failure (title, steps, expected, actual, screenshot/trace), and optionally file it to Jira via MCP. Use when a test fails on a genuine product bug, not selector drift.
---

# Bug-reporting skill

When a test fails because the product is wrong (not because a selector moved), the
`reporter` agent turns it into a report a developer can act on. The format is the
standard QA bug write-up; every field is grounded in what actually happened.

## The report (see templates/bug-report.template.md)

Title, Environment, Severity/Priority, Traceability, Failing test, Preconditions,
Steps to reproduce, Expected result, Actual result, Attachments.

- Steps come from the real actions the test took.
- Expected comes from the acceptance criterion / plan.
- Actual is the real failed assertion, error, or observed state.
- Attachments are the real Playwright artifacts under `test-results/`:
  `test-failed-1.png` (screenshot), `trace.zip` (open with
  `yarn playwright show-trace <path>`), and the video. Playwright is configured to
  capture screenshot on failure, trace on first retry, video on failure.

## Where it goes

- Default: `bug-reports/BUG-<date>-<slug>.md`.
- Jira: if an Atlassian/Jira MCP server is configured, the reporter creates the
  issue there and links the artifacts. See `templates/mcp.jira.example.json`: merge
  its `atlassian` entry into `.mcp.json`. It uses Atlassian's official Remote MCP
  Server and opens an OAuth login on first run. Remove it if you do not use Jira.

## Rules

- Only report a failure that has been confirmed as a real bug (healer/reviewer), not
  selector drift.
- Ground every field. Never invent a step, an error message, a stack trace or a
  screenshot. If something is missing, say so in the report.
- Filing a Jira issue is a real side effect: do it when asked, and report the issue
  key and URL. Otherwise write the Markdown report and offer to file it.

Sources:

- Standard bug write-up format: https://folio-org.atlassian.net/wiki/spaces/COMMUNITY/pages/4227970
- Atlassian Remote MCP Server: https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/
