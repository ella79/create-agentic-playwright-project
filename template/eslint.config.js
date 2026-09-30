import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Flat config, the recommended ESLint setup.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files
 */
export default tseslint.config(
  {
    ignores: ["node_modules", "playwright-report", "test-results", "reports", "**/*.d.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
