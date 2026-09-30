/**
 * Programmatic agent runner using the Claude Agent SDK.
 * Docs: https://docs.claude.com/en/api/agent-sdk/typescript
 *
 * This is the "run an agent from code" entry point, complementing the
 * interactive Claude Code workflow. It streams messages from a query and can
 * expose your own tools through an in-process MCP server.
 *
 * Usage:  yarn agent "Write an e2e test for the login flow"
 * Needs:  ANTHROPIC_API_KEY in the environment.
 */
import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

// Example of a project-specific tool the agent can call.
const projectTools = createSdkMcpServer({
  name: "project",
  version: "0.1.0",
  tools: [
    tool(
      "list_page_objects",
      "List the page objects available in utils/pageObjects, optionally filtered by name.",
      { filter: z.string().optional().describe("Case-insensitive substring to match") },
      async ({ filter }) => {
        const fs = await import("node:fs/promises");
        const files = await fs.readdir(new URL("../utils/pageObjects", import.meta.url));
        const matched = filter
          ? files.filter((f) => f.toLowerCase().includes(filter.toLowerCase()))
          : files;
        return { content: [{ type: "text", text: matched.join("\n") }] };
      },
    ),
  ],
});

async function main() {
  const prompt =
    process.argv.slice(2).join(" ") ||
    "Read specs/ and propose the next test to write. Do not edit files.";

  for await (const message of query({
    prompt,
    options: {
      cwd: process.cwd(),
      // Keep the agent read-only by default; widen deliberately.
      allowedTools: ["Read", "Grep", "Glob"],
      permissionMode: "default",
      mcpServers: { project: projectTools },
      maxTurns: 8,
    },
  })) {
    if (message.type === "assistant") {
      for (const block of message.message.content) {
        if (block.type === "text") process.stdout.write(block.text);
      }
    }
  }
  process.stdout.write("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
