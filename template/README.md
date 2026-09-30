# **PROJECT_NAME**

An agentic QA suite: Playwright + TypeScript with Claude Code agents and skills,
Playwright MCP, an evals gate, CI and architecture docs. Read `ARCHITECTURE.md`
for the design and `CLAUDE.md` for how agents work here.

## Stack

- **Framework:** Playwright Test (e2e, visual regression, API projects).
- **Language:** TypeScript (ESM). Node 18+. Package manager: Yarn 4 (Corepack).
- **Agents (Claude Code, `.claude/agents/`):** planner, generator, healer, reviewer,
  reporter.
- **Skills (`.claude/skills/`):** requirements, page-object, visual-regression,
  api-testing, playwright-mcp, evals, bug-reporting, jira-ticket.
- **Commands (`.claude/commands/`):** `/feature` (full cycle), `/ticket` (work a Jira issue).
- **Structure:** page objects and fixtures under `utils/` (`utils/pageObjects`,
  `utils/fixtures`, `utils/url.ts`, `utils/setup`), tests under `tests/{e2e,visual,api}`,
  plans under `specs/{test-plans,vr-test-plans,api-test-plans}`. Playwright does not
  mandate a folder layout beyond `tests/` + `playwright.config.ts`; this is a
  convention, see `STRUCTURE.md`.

## Requirements

- Node 18+ and Yarn (Corepack: `corepack enable`).
- For the agentic workflow: Claude Code, and an `ANTHROPIC_API_KEY` for the
  programmatic runner.

## Install

Install the scaffolder globally from GitHub, then generate a project. You do not need
a Git repo first, the scaffolder creates the project folder.

```bash
# 1. install the scaffolder (global, from GitHub - public repo, no token)
npm install -g github:ella79/create-agentic-playwright-project

# 2. scaffold a new project (creates the ./my-app folder)
create-agentic-playwright-project my-app
cd my-app

# 3. install and set up
corepack enable            # use Yarn 4
yarn install
yarn playwright install    # download browsers
cp .env.example .env       # set BASE_URL

# 4. make it a Git repo and push (optional)
git init
git add -A
git commit -m "chore: scaffold agentic QA suite"
git branch -M main
# create an empty repo on GitHub first (no README), then:
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Other ways to run the scaffolder (public repo, no account needed):

```bash
npx github:ella79/create-agentic-playwright-project my-app   # no global install
npx create-agentic-playwright-project my-app                 # if also published to npm
```

The scaffold already ships `.gitignore`, CI (`.github/workflows/ci.yml`) and the
Claude Code agents/skills, so the first push is a complete project.

## Run the tests

```bash
yarn test            # all projects
yarn test:e2e        # end-to-end only
yarn test:visual     # visual regression
yarn test:api        # API/contract
yarn report          # open the HTML report
yarn typecheck
yarn evals           # pre-CI checks over the tests
```

## Agentic workflow (Claude Code + Playwright MCP)

```bash
yarn playwright init-agents --loop=claude   # sets up planner / generator / healer
```

1. Planner reads `requirements/` first: it turns each acceptance criterion into a
   traceable scenario (`STORY-<id> / AC<n>`). With no requirements, it explores the
   running app instead. Either way it writes a plan into `specs/`.
2. You review it.
3. Generator turns the plan into a test in `tests/`, using the page objects.
4. `yarn evals` and the reviewer agent check it before CI.
5. Healer repairs selector drift when a test breaks.
6. Reporter turns a confirmed real bug into a Jira-ready report in `bug-reports/`
   (and files it to Jira if a Jira MCP is configured; see `templates/mcp.jira.example.json`).

Playwright MCP is configured in `.mcp.json`. Claude Code picks up the agents in
`.claude/agents` and skills in `.claude/skills` automatically.

## Programmatic agents

```bash
yarn agent "Read specs/ and propose the next test to write."
```

Uses `@anthropic-ai/claude-agent-sdk` (`agent/run.ts`). Read-only by default.
Learn more in the official documentation:
https://platform.claude.com/docs/en/agent-sdk/overview

## End-to-end for one feature

In Claude Code, run the whole cycle for a feature with one command:

```
/feature STORY-001
```

It drives planner -> (your approval) -> generator -> reviewer -> run -> healer or
reporter, then summarizes AC coverage. See `.claude/commands/feature.md`.

## Orchestration

No separate manager is needed. The LLM (the Claude Code session) is the orchestrator:
it reads the agents, skills and CLAUDE.md, decides which subagent to run and routes
between them. `/feature` is the end-to-end script it follows; `agent/run.ts` is the
programmatic version via the Claude Agent SDK. A "manager agent" is optional - just a
policy prompt the same LLM adopts.

## Visual snapshots (Linux baselines)

Snapshots include the platform in the name, and CI runs on Linux. Generate baselines
on Linux so they match:

```bash
yarn snapshots:linux      # updates baselines inside the official Playwright Linux image
```

Review and commit the files in the `<spec>-snapshots/` folders next to each visual spec. The shared `HomePage`
object drives the e2e and visual tests; API tests use Playwright's `request` directly
(no page object). See `specs/test-plans/`, `specs/vr-test-plans/`, `specs/api-test-plans/`
for example plans (one per area, per type).

## Docker

Run the suite in the official Playwright image (browsers + OS deps included):

```bash
docker build -t __PROJECT_NAME__ .
docker run --rm -e BASE_URL=http://host.docker.internal:3000 __PROJECT_NAME__ yarn test
```

Keep the base image tag in `Dockerfile` in sync with `@playwright/test`.

## Requirements-driven tests

Drop user stories with acceptance criteria in `requirements/` (see
`templates/user-story.template.md` and the `requirements` skill). The planner maps
each acceptance criterion to a test and tags it for traceability. Leave the folder
empty to work exploratory-first.

## Layout

See `ARCHITECTURE.md`. Copy from `templates/` when adding a story, plan, page object or test.

## Reporting bugs

For this scaffolder, open an issue on its repository. For the Claude Agent SDK
itself, file a GitHub issue: https://github.com/anthropics/claude-agent-sdk-typescript/issues

## License

MIT
