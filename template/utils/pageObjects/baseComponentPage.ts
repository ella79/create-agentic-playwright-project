import type { Locator } from "@playwright/test";

/**
 * BaseComponentPage - a component scoped to a root locator. Every child resolves
 * inside root, so two components sharing a label never cross-match. Use for modals,
 * rows, cards. See utils/pageObjects/shared for examples.
 */
export abstract class BaseComponentPage {
  constructor(protected readonly root: Locator) {}
}
