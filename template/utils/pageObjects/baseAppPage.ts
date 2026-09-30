import type { Page, Locator } from "@playwright/test";

/**
 * BaseAppPage - a URL-addressable page. Owns navigation and the shared chrome
 * (header, footer). Concrete pages add a gotoXxxPage() that navigates through the
 * url map and asserts a landmark is visible, so navigation is proven, not assumed.
 * Every locator is a readonly property; no spec reaches the DOM directly.
 */
export abstract class BaseAppPage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole("banner");
    this.footer = page.getByRole("contentinfo");
  }

  protected async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
