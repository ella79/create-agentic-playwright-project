# create-agentic-playwright-project

Scaffold a production-shaped **QA project** in one command: Playwright +
TypeScript, with Claude Code agents and skills, Playwright MCP, an evals gate,
CI and architecture docs. It gives you the architecture already defined in the
repo, so you start a new project from a real structure instead of a blank page.

## What you get
- Playwright + TypeScript, Page Object Model (two bases), fixtures, semantic locators, `utils/url.ts`, auth `setup` project.
- Three test projects: `e2e`, `visual`, `api`. Independent tests, `fullyParallel`, CI sharded in parallel.
- Claude Code setup: `CLAUDE.md`, agents (planner, generator, healer, reviewer, reporter),
  skills (requirements, page-object, visual-regression, api-testing, playwright-mcp, evals, bug-reporting, jira-ticket, test-status),
  commands (`/feature`, `/ticket`, `/coverage`).
- Playwright MCP wired in `.mcp.json`; `seed.spec.ts` for the agents workflow; optional Jira MCP.
- Programmatic runner using `@anthropic-ai/claude-agent-sdk` (`agent/run.ts`).
- Evals gate (`evals/run-evals.ts`) + GitHub Actions CI (build image -> static gate -> sharded suite -> merged report).
- Requirements-driven plans with traceability, `specs/STATUS.md` coverage report, Dockerfile, ADRs as project memory.
- Templates for stories, plans, page objects and tests.

Everything follows official guidance (Playwright best practices, POM, fixtures,
snapshots, API testing, test-agents, reporters, sharding; Claude Agent SDK; MCP).
Sources are cited in the generated `ARCHITECTURE.md`.

## What the command generates (structure at your project root)
Running the command copies everything at the **root of your new project** (the
`template/` folder in THIS repo is only the source; your generated project has no
`template/` — the files land at its root and run as-is):

```
my-app/
  package.json  playwright.config.ts  tsconfig.json  eslint.config.js
  utils/            pageObjects (BaseAppPage, BaseComponentPage, home/), fixtures, url.ts, setup
  tests/            e2e/  visual/  api/
  specs/            test-plans/  vr-test-plans/  api-test-plans/  STATUS.md
  requirements/     user stories with acceptance criteria
  bug-reports/      Jira-ready reports (reporter output)
  agent/run.ts      programmatic runner (Claude Agent SDK)
  evals/            pre-CI checks
  docs/             notes.md, adr/
  templates/        copy-me templates (story, plan, page object, spec)
  .claude/          agents, skills, commands
  .github/workflows/ci.yml   Dockerfile   .mcp.json   .gitignore   seed.spec.ts
  README.md  ARCHITECTURE.md  CLAUDE.md  STRUCTURE.md  LICENSE
```
`cd my-app && yarn install && yarn test` runs immediately. Full details in the
generated `STRUCTURE.md`.

## Install and use

```bash
# install the scaffolder globally from GitHub (public repo, no token)
npm install -g github:ella79/create-agentic-playwright-project
create-agentic-playwright-project my-app
```

Other ways to run it (public repo, no account needed):
```bash
npx github:ella79/create-agentic-playwright-project my-app   # no global install
npx create-agentic-playwright-project my-app                 # if also published to npm
```

Then set the project up:
```bash
cd my-app
corepack enable
yarn install
yarn playwright install
yarn test
```

## Develop this scaffolder (from source)
```bash
git clone https://github.com/ella79/create-agentic-playwright-project
cd create-agentic-playwright-project
node index.js ../my-app        # scaffolds ../my-app from ./template
```

## How it works
The CLI copies `template/` into your target folder, replaces `__PROJECT_NAME__`
tokens, and restores dotfiles (`.claude`, `.github`, `.mcp.json`, `.gitignore`).
No runtime dependencies.

## License
[MIT](LICENSE.md)
