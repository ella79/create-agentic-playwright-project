# Bug reports

When a test fails on a real product bug (not selector drift), the `reporter` agent
writes a standard bug report here as `BUG-<date>-<slug>.md`, in the shape of
`templates/bug-report.template.md`: title, environment, steps, expected, actual and
the real Playwright artifacts (screenshot, trace, video) from `test-results/`.

If a Jira MCP server is configured (see `templates/mcp.jira.example.json` and the
`bug-reporting` skill), the reporter creates the Jira issue directly instead of, or
in addition to, writing the file here.
