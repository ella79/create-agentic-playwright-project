#!/usr/bin/env node
/**
 * create-agentic-playwright-suite
 * Scaffolds a Playwright + TypeScript agentic-QA project.
 *
 * Usage:
 *   npm create agentic-playwright-suite@latest my-suite
 *   npm create agentic-playwright-suite@latest            (will prompt for a name)
 *
 * No third-party dependencies: it copies template/ into the target folder
 * and replaces __PROJECT_NAME__ tokens.
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(here, "template");

// Files that must be renamed after copy (npm strips a leading dot in published
// packages, and .gitignore/.github can be awkward, so we ship them dot-less).
const RENAME = {
  "gitignore": ".gitignore",
  "npmrc": ".npmrc",
  "github": ".github",
  "claude": ".claude",
  "mcp.json": ".mcp.json",
  "dockerignore": ".dockerignore",
};

function ask(question, fallback) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve((answer || "").trim() || fallback);
    });
  });
}

function isValidName(name) {
  return /^[a-z0-9][a-z0-9._-]*$/.test(name);
}

function copyDir(src, dest, projectName) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const toName = RENAME[entry.name] || entry.name;
    const to = path.join(dest, toName);
    if (entry.isDirectory()) {
      copyDir(from, to, projectName);
    } else {
      let content = fs.readFileSync(from);
      // Only token-replace text files.
      if (/\.(ts|js|json|md|yml|yaml|txt|html|css|gitignore|npmrc)$/i.test(entry.name) ||
          entry.name === "gitignore" || entry.name === "npmrc") {
        content = Buffer.from(
          content
            .toString("utf8")
            // Prettier renders __PROJECT_NAME__ as **PROJECT_NAME** in Markdown
            // prose, so replace both forms.
            .replace(/__PROJECT_NAME__/g, projectName)
            .replace(/\*\*PROJECT_NAME\*\*/g, projectName),
          "utf8"
        );
      }
      fs.writeFileSync(to, content);
    }
  }
}

async function main() {
  let target = process.argv[2];
  if (!target) {
    target = await ask("Project name (folder to create): ", "agentic-qa-suite");
  }
  const projectName = path.basename(target);
  if (!isValidName(projectName)) {
    console.error(`\nInvalid project name "${projectName}". Use lowercase letters, numbers, dashes.`);
    process.exit(1);
  }
  const dest = path.resolve(process.cwd(), target);
  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
    console.error(`\nDirectory "${target}" already exists and is not empty. Aborting.`);
    process.exit(1);
  }
  if (!fs.existsSync(templateDir)) {
    console.error("\nTemplate folder not found. Reinstall create-agentic-playwright-suite.");
    process.exit(1);
  }

  console.log(`\nScaffolding agentic-QA project in ${dest} ...`);
  copyDir(templateDir, dest, projectName);

  console.log(`\nDone. Next steps:\n`);
  console.log(`  cd ${target}`);
  console.log(`  yarn install`);
  console.log(`  yarn playwright install`);
  console.log(`  yarn test\n`);
  console.log(`Agentic workflow (needs Claude Code + Playwright MCP):`);
  console.log(`  yarn playwright init-agents --loop=claude   # planner / generator / healer`);
  console.log(`  read CLAUDE.md and ARCHITECTURE.md first.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
