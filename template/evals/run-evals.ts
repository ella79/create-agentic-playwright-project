/**
 * Evals gate: check agent-produced tests before they reach CI.
 *
 * This is the human-gate-as-code from the architecture. It runs cheap,
 * deterministic checks over the tests the generator wrote, so a green run is
 * about correctness, not just "it compiled". Extend the checks list with your
 * own rules. Exit code is non-zero on failure so CI can block on it.
 *
 * Usage:  yarn evals
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

type Check = { name: string; run: (file: string, src: string) => string | null };

const checks: Check[] = [
  {
    name: "no test.only left in source",
    run: (_f, src) => (/\btest\.only\b/.test(src) ? "contains test.only" : null),
  },
  {
    name: "no hardcoded sleeps",
    run: (_f, src) =>
      /waitForTimeout\(\s*\d+/.test(src)
        ? "uses waitForTimeout (flaky); wait on state instead"
        : null,
  },
  {
    name: "asserts something",
    run: (_f, src) => (/\bexpect\s*\(/.test(src) ? null : "no expect() assertion found"),
  },
  {
    name: "no raw page.locator in tests (use page objects)",
    run: (f, src) =>
      f.includes(`${sep}tests${sep}`) && /page\.locator\(/.test(src)
        ? "raw page.locator in a test; move it into a page object"
        : null,
  },
];

const sep = "/";

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(spec|test)\.ts$/.test(name)) out.push(p);
  }
  return out;
}

const files = ["tests"].flatMap((d) => {
  try {
    return walk(d);
  } catch {
    return [];
  }
});

let failures = 0;
for (const file of files) {
  const src = readFileSync(file, "utf8").replace(/\\/g, "/");
  for (const check of checks) {
    const problem = check.run(file.replace(/\\/g, "/"), src);
    if (problem) {
      failures++;
      console.error(`FAIL  ${file}  [${check.name}]  ${problem}`);
    }
  }
}

if (failures === 0) {
  console.log(`evals passed: ${files.length} files, ${checks.length} checks each.`);
  process.exit(0);
} else {
  console.error(`\nevals failed: ${failures} problem(s). Fix before CI.`);
  process.exit(1);
}
