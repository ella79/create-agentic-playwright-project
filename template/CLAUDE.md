# **PROJECT_NAME** - working notes for Claude Code

Agentic QA suite: Playwright + TypeScript. Read ARCHITECTURE.md before making
changes. This file is the contract for how agents work in this repo.

## Conventions

- Language: TypeScript, ESM. Node >= 18. Package manager: **Yarn**.
- Tests assert on behavior and outcome, not markup. No raw `page.locator(...)`
  inside a test; selectors live in page objects under `utils/pageObjects`.
- Page objects expose intent methods (login, search), never raw selectors.
- Prefer role/label queries (`getByRole`, `getByLabel`) over CSS/XPath.
- Never use `waitForTimeout`; wait on state.
- One test type per folder: `tests/e2e`, `tests/visual`, `tests/api`.
- Every test is independent (own state, no ordering). The suite runs `fullyParallel`; CI shards it across parallel jobs, workers at 100% per shard.

## Commands

- Install: `yarn install` then `yarn playwright install`
- Run: `yarn test` (or `yarn test:e2e` / `test:visual` / `test:api`)
- Typecheck: `yarn typecheck`
- Evals gate (run before CI): `yarn evals`
- Programmatic agent: `yarn agent "..."`

## Agentic workflow

- Playwright agents: `yarn playwright init-agents --loop=claude` sets up
  planner, generator and healer. Playwright MCP is configured in `.mcp.json`.
- Requirements first: if `requirements/` holds user stories with acceptance
  criteria, the planner turns each criterion into a scenario and tags it
  `STORY-<id> / AC<n>` for traceability (see the `requirements` skill). If empty,
  the planner explores the running app instead.
- Planner writes a plan into `specs/` (uses `seed.spec.ts`). You review the plan.
- Generator turns an approved plan into a test in `tests/`, using the page
  objects. It verifies selectors and assertions live against the UI.
- Healer repairs a failing test by inspecting the current page and proposing a
  locator fix. It handles selector drift, not business-logic failures.
- Reporter turns a confirmed real bug (healer/reviewer says it is not drift) into a
  standard bug report in `bug-reports/`, and files it to Jira when a Jira MCP is
  configured. See the `bug-reporting` skill.

## Orchestration (who runs the agents)

A single LLM coordinates multiple specialized agents - there is no separate "manager"
process. The LLM (the Claude Code session) is that orchestrator: it reads the agent definitions, the skills and this file, picks which
subagent to run, routes between them, and applies the skills. Subagents do not call
each other. `/feature` is the script that LLM follows end to end; `agent/run.ts` is the
programmatic equivalent via the Claude Agent SDK's `query()`. A "manager agent" would
only be a policy prompt the same LLM adopts - it is optional, not required.

## End-to-end for one feature

Run `/feature <STORY-id or description>` (see `.claude/commands/feature.md`) to drive
the whole cycle: planner -> your approval -> generator -> reviewer -> run -> healer or
reporter -> AC-coverage summary. It stops at the plan for your approval and at the
reviewer gate.

## The human gate (do not skip)

Every agent-generated test passes `yarn evals` and a human review before it
reaches CI. Green is not the goal, correct is. A healer can make a test green
on the wrong element; the evals gate and review exist to catch that.

## Agent operating rules (token-lean, grounded, self-healing)

Aligned with Anthropic's guidance on context engineering and effective agents.
Every agent here follows these:

- **Token / context budget.** Load only what the current step needs. Prefer
  Grep/Glob and reading specific ranges over dumping whole files. Keep prompts
  and tool sets minimal; each agent gets least-privilege tools, not all of them.
  Set a `maxTurns` bound. Use subagents to isolate context, and compact long
  runs into `docs/notes.md` instead of carrying everything in-context.
- **Grounding (no hallucination).** Never invent selectors, endpoints, fields,
  results or file contents. Verify against the real page (Playwright MCP) or the
  real file before writing or asserting. If a fact cannot be verified, say so and
  stop; do not guess. Assertions must reflect what the app actually shows.
- **Self-healing, bounded.** On failure, retry a small, fixed number of times,
  fixing at the source (locator or wait), not by weakening assertions. Stop and
  report if the failure is a real behavior change.
- **Evals before cost.** Run the cheap deterministic `yarn evals` and typecheck
  before spending model turns or CI minutes.

## Project memory (agents must use it)

- This file (CLAUDE.md), ARCHITECTURE.md and `docs/adr/` are the project memory.
  Read them before acting and keep them true.
- Durable decisions (a new convention, a tool choice, a trade-off) get recorded
  as a short ADR in `docs/adr/` so the next session and the next agent inherit
  the reasoning instead of re-deriving it.
- Running notes an agent needs across turns go in `docs/notes.md` (create it if
  missing). Do not invent state; write down what was actually decided.

## Custom skills

- `.claude/skills/requirements` - turn user stories + acceptance criteria into a traceable plan.
- `.claude/skills/bug-reporting` - write a Jira-ready bug report from a confirmed real failure.
- `.claude/skills/jira-ticket` - read a Jira ticket by key and update it when fixed.
- `.claude/skills/test-status` - keep specs/STATUS.md in sync from reports/results.json.
- `.claude/skills/page-object` - add or extend a page object.
- `.claude/skills/visual-regression` - add a stable visual test.
- `.claude/skills/api-testing` - add an API/contract test.
- `.claude/skills/playwright-mcp` - drive a real browser to author/heal tests.
- `.claude/skills/evals` - run and extend the pre-CI evals gate.

## Templates

- `templates/test-plan.template.md`, `templates/PageObject.template.ts`,
  `templates/spec.template.ts` - copy these when adding new plans, pages or tests.
