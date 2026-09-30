---
description: Run the full QA cycle for one feature/story end to end - plan, generate, review, run, heal or report.
argument-hint: <STORY-id or a short feature description>
---

Run the end-to-end QA cycle for: **$ARGUMENTS**

Drive the subagents in order (the `manager` agent owns the scope/coverage decisions and the cycle), keep each step token-lean, and stop at the human gate.

1. **Plan.** Use the `planner` subagent. If `$ARGUMENTS` names a story in
   `requirements/`, plan from its acceptance criteria (one scenario per AC, tagged
   `STORY-<id> / AC<n>`). Otherwise explore the app over Playwright MCP. Output a
   plan in `specs/`.
   -> STOP and show me the plan for approval. Do not generate tests until I approve.

2. **Generate.** After approval, use the `generator` subagent to turn the approved
   plan into tests under `tests/`, selectors in page objects, carrying the
   `story`/`ac` annotations. Then run `yarn evals` and `yarn typecheck`.

3. **Review.** Use the `reviewer` subagent. If it requests changes, loop back to
   step 2 with its list. Do not proceed until it approves.

4. **Run.** Run the suite (`yarn test`, or the relevant project). If green, go to 6.

5. **Triage failures.**
   - Selector drift or a bad wait -> `healer` subagent, bounded retries, fix at the
     source, never weaken an assertion. Re-run.
   - A real product bug -> `reporter` subagent: write a standard bug report in
     `bug-reports/` (and file it to Jira only if I ask and a Jira MCP is configured).
     Do not force the test green.

6. **Summarize.** Report coverage: each acceptance criterion and the test that
   covers it, what passed, and any bug reports opened. Note anything left for me.

Rules: generate only from approved plans and written acceptance criteria; verify
selectors and assertions live before asserting; never invent steps, results or
requirements; respect the human gate at step 1 and the reviewer gate at step 3.
