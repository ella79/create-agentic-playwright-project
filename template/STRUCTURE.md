# Project structure

The skeleton `create-agentic-playwright-suite` generates. Grounded in Playwright's own guidance
(Page Object Model, semantic locators, test-agents) and Anthropic's guidance on
agents. `__PROJECT_NAME__` is replaced with your project name.

```
__PROJECT_NAME__/
  README.md                  How to install, run, and use the agents
  ARCHITECTURE.md            Design, layout, locator convention, references
  CLAUDE.md                  Contract for how agents work in this repo
  package.json               Yarn 4; scripts (test, lint, format, evals, agent, snapshots:linux)
  playwright.config.ts       Projects (e2e/visual/api), reporters, testIdAttribute, trace on failure
  tsconfig.json              Strict TS, path aliases (@pages, @fixtures)
  eslint.config.js           Flat ESLint config
  Dockerfile                 Official Playwright image (browsers + OS deps)
  .dockerignore
  .mcp.json                  Playwright MCP server for the agents
  .env.example               BASE_URL
  seed.spec.ts               Reach a known starting state (planner reads this first)

  src/
    pages/                   Page objects - selectors + intent, never in tests
      BaseAppPage.ts         URL-addressable page: navigation + shared chrome
      BaseComponentPage.ts   Component scoped to a root locator (modals, rows, cards)
      HomePage.ts            Example page object
    fixtures/
      test.ts                Wires page objects into the test signature

  tests/
    e2e/                     Functional user journeys
    visual/                  Visual regression (@visual), Linux baselines
    api/                     API tests (@api) - Playwright `request`, no page object

  specs/                     Test plans - one per area, per type
    test-plans/              Functional plans
    vr-test-plans/           Visual regression plans
    api-test-plans/          API plans

  requirements/              User stories with acceptance criteria (planner input)
    STORY-001.md             Example story

  bug-reports/               Standard Jira-ready bug reports (reporter output)

  templates/                 Copy-me templates
    user-story.template.md
    test-plan.template.md
    bug-report.template.md
    PageObject.template.ts
    spec.template.ts
    mcp.jira.example.json    Optional Jira MCP to merge into .mcp.json

  agent/
    run.ts                   Programmatic runner using the Claude Agent SDK
  evals/
    run-evals.ts             Deterministic pre-CI checks over agent-written tests

  docs/
    notes.md                 Running notes agents keep across turns
    adr/                     Architecture decision records (project memory)

  .claude/
    agents/                  planner, generator, healer, reviewer, reporter
    commands/                feature (runs the whole cycle end to end)
    skills/                  requirements, page-object, visual-regression,
                             api-testing, playwright-mcp, evals, bug-reporting,
                             jira-ticket, test-status

  .github/
    workflows/ci.yml         Build image -> static gate -> Playwright suite
```

## Conventions in one place

- **Locators, semantic first:** `getByRole` > `getByLabel` > `getByPlaceholder` >
  `getByText` > `getByTestId` (via `testIdAttribute`) > CSS/XPath (last resort, with a
  reason). See the `page-object` skill.
- **Page objects:** two bases (`BaseAppPage`, `BaseComponentPage`); locators are
  `readonly`; tests never touch the DOM directly.
- **Plans:** one per area, per type (functional / visual / API), in the three `specs/`
  folders. The planner does not mix types in a plan.
- **API tests:** the test lives in the spec and uses Playwright's `request`; no page object.
