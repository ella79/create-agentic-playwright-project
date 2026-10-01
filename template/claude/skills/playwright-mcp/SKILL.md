---
name: playwright-mcp
description: Use the Playwright test MCP server so an agent can drive a real browser (navigate, click, read the accessibility tree, snapshot) while planning and authoring tests, and run/debug the suite while healing. Use before planning, generating or healing tests.
---

# Playwright MCP skill

This project wires the agents to the **official Playwright test MCP server**,
exactly as Playwright defines it (`playwright run-test-mcp-server`). One server
exposes two families of tools:

- **browser tools** (`browser_*`) - a real browser through the accessibility tree,
  not screenshots, so actions and locators are grounded in the live page.
- **test tools** (`test_run`, `test_debug`, `test_list`) - run and debug the
  committed suite with structured results.

In Claude Code the tools are named `mcp__playwright-test__<tool>` (for example
`mcp__playwright-test__browser_snapshot`, `mcp__playwright-test__test_run`).

## Setup

- One server is declared in `.mcp.json` at the repo root:
  ```json
  { "mcpServers": { "playwright-test": { "type": "stdio", "command": "npx", "args": ["playwright", "run-test-mcp-server"] } } }
  ```
- It ships inside `@playwright/test` (already a dependency), so nothing extra to
  install. `--test-id-attribute` and viewport are not MCP flags here; they live in
  `playwright.config.ts` (`use.testIdAttribute`, `use.viewport`), which this server reads.
- Claude Code asks you to approve the server the first time it runs. Browsers must
  be installed once: `yarn playwright install`.

## Which agent uses which tools (least-privilege, per the official definitions)

| Agent | browser tools | test tools (`test_run`/`test_debug`/`test_list`) |
|---|---|---|
| planner | yes - explore, `planner_setup_page` first | no |
| generator | yes - verify selectors live, `generator_setup_page` first | no |
| healer | yes - inspect the paused page (`browser_snapshot`, `browser_generate_locator`, ...) | **yes - the only agent that runs the suite** |
| manager, reviewer, reporter | no | no |

## How to use it

- Plan: `planner_setup_page`, then `browser_*` to explore; write the plan.
- Author: `generator_setup_page`, then `browser_*` / `browser_verify_*` to confirm
  locators and assertions on the live page before writing them into the page object.
- Heal: `test_run` to find the failure, `test_debug` to pause on it, `browser_*` to
  inspect, fix at the source, `test_run` again until green.

## Rules

- Prefer role/label queries surfaced by the accessibility tree over CSS/XPath.
- Verify a locator resolves to exactly one intended element before using it.
- Only the healer runs the suite (`test_run`). Planner and generator never execute
  tests; they only drive the browser.
- The MCP is for planning, authoring and healing. It does not replace the committed
  tests in `tests/`, which stay the source of truth and the thing CI runs.
