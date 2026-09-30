# Architecture

This project is an agentic QA suite: Playwright + TypeScript for the tests, with
Claude Code agents and skills, Playwright MCP, an evals gate and CI. The design
follows official recommendations; sources are listed at the end.

## Principles

- **Test user-visible behavior, assert outcomes, not implementation.** Web-first
  assertions, role/label locators, test isolation, no `waitForTimeout`. (Playwright best practices.)
- **Page Object Model.** Selectors and actions live in `utils/pageObjects`; tests read as
  intent. (Playwright POM guidance.)
- **One test type per project.** `e2e`, `visual`, `api` are separate Playwright
  projects so they configure and shard independently.
- **AI writes the scaffolding, a human gate decides if it is right.** Agents plan,
  generate and heal; the evals gate plus review stand between them and CI.

## Layout

```
src/
  pages/         Page objects: BaseAppPage + BaseComponentPage, one per screen
  fixtures/      Test fixtures that inject page objects
tests/
  e2e/           End-to-end user journeys
  visual/        Visual regression (@visual)
  api/           REST/GraphQL tests (@api) - use `request`, no page object
requirements/    User stories with acceptance criteria (planner input)
specs/
  test-plans/      Functional plans (one per area)
  vr-test-plans/   Visual regression plans (one per area)
  api-test-plans/  API plans (one per area)
bug-reports/     Standard bug reports the reporter writes (Jira-ready)
seed.spec.ts     Starting state for the agents workflow
agent/           Programmatic runner using the Claude Agent SDK
evals/           Pre-CI checks over agent-written tests
templates/       Copy-me templates for stories, plans, page objects, tests
docs/adr/        Architecture decision records (project memory)
.claude/
  agents/        planner, manager, generator, healer, reviewer, reporter
  skills/        requirements, page-object, visual-regression, api-testing, playwright-mcp, evals, bug-reporting, jira-ticket, test-status
  commands/      feature (end-to-end cycle)
.mcp.json        Playwright MCP server (+ optional Jira, see templates/mcp.jira.example.json)
Dockerfile         Playwright test image (browsers + deps)
.github/workflows/ci.yml   Build image -> static gate -> Playwright suite
```

## Locators

Semantic first, in priority order: `getByRole`, `getByLabel`, `getByPlaceholder`,
`getByText`, then `getByTestId` (mapped to your app's attribute via `testIdAttribute`
in `playwright.config.ts` - `data-testid` by default, or `data-qa`, `data-component`),
and CSS/XPath only as a last resort with an inline reason. This follows Playwright's
own guidance (user-facing locators over CSS, test id as fallback). Details in the
`page-object` skill.

## The agentic workflow

The LLM is the orchestrator - a single LLM coordinates the multiple agents. The Claude Code session reads the agents, skills and docs,
runs each subagent and routes between them (subagents do not call each other). `/feature`
is the script it follows; no separate manager process exists.

1. **Planner** reads `requirements/` first (stories + acceptance criteria) and maps
   each criterion to a traceable scenario; with no requirements it runs
   `seed.spec.ts` and explores (via Playwright MCP). Either way it writes a plan in `specs/`.
2. You review the plan.
3. **Generator** turns the plan into a test in `tests/`, using page objects, verifying selectors live.
4. **evals gate** (`yarn evals`) + **reviewer** check it.
5. **Healer** repairs selector drift when tests break; on a real behavior change it stops and hands off to the **Reporter**, which writes a Jira-ready bug report (and files it to Jira if a Jira MCP is configured).

Set it up with `yarn playwright init-agents --loop=claude`.

## Programmatic agents

`agent/run.ts` uses `@anthropic-ai/claude-agent-sdk` (`query`, `tool`,
`createSdkMcpServer`) to run agents from code and expose project-specific tools.
Read-only by default (`allowedTools: Read/Grep/Glob`); widen deliberately.

## Memory

CLAUDE.md, this file and `docs/adr/` are the project memory. Durable decisions
become ADRs so agents and future sessions inherit the reasoning.

## References

- Playwright best practices: https://playwright.dev/docs/best-practices
- Page Object Model: https://playwright.dev/docs/pom
- Locators: https://playwright.dev/docs/locators
- Test fixtures: https://playwright.dev/docs/test-fixtures
- Visual comparisons: https://playwright.dev/docs/test-snapshots
- API testing: https://playwright.dev/docs/api-testing
- Test agents (planner/generator/healer): https://playwright.dev/docs/test-agents
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Claude Agent SDK (overview): https://platform.claude.com/docs/en/agent-sdk/overview
- Claude Agent SDK (TypeScript repo): https://github.com/anthropics/claude-agent-sdk-typescript
- Claude Code subagents: https://docs.claude.com/en/docs/claude-code/sub-agents
- Agent Skills: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
- Model Context Protocol: https://modelcontextprotocol.io
- Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- Effective context engineering for AI agents: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Writing effective tools for agents: https://www.anthropic.com/engineering/writing-tools-for-agents
- Demystifying evals for AI agents: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
