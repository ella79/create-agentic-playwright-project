---
name: playwright-mcp
description: Use the Playwright MCP server to let an agent drive a real browser (navigate, click, read the accessibility tree, snapshot) while writing or healing tests. Use before generating or healing UI tests.
---

# Playwright MCP skill

Playwright MCP gives an agent a real browser through the accessibility tree,
not screenshots, so its actions and locators are grounded in the live page.

## Setup

- The server is declared in `.mcp.json` at the repo root:
  `{ "mcpServers": { "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] } } }`
- Claude Code picks it up automatically when you open this repo. In other MCP
  clients (Claude Desktop, VS Code, Cursor), add the same entry.
- Browsers must be installed once: `yarn playwright install`.

## How to use it

- To write a test: navigate to the target, read the page (accessibility
  snapshot), pick role/label locators, verify they resolve, then hand to the
  generator to write the page object and test.
- To heal a test: open the failing route, find the equivalent element in the
  current tree, update the locator in the page object.

## Rules

- Prefer role/label queries surfaced by the accessibility tree over CSS/XPath.
- Verify a locator resolves to exactly one intended element before using it.
- MCP is for authoring and healing. It does not replace committed tests; the
  suite in `tests/` is the source of truth.
