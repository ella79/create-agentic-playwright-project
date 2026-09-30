import type { Page, Locator } from "@playwright/test";
import { BaseAppPage } from "../utils/pageObjects/baseAppPage.js";

/**
 * Page Object template. Copy to utils/pageObjects/<area>/<name>Page.ts and rename the class.
 * Pattern follows Playwright's Page Object Model guidance
 * (https://playwright.dev/docs/pom): selectors and actions live here, tests
 * call intent methods. Prefer role/label locators
 * (https://playwright.dev/docs/locators, /docs/best-practices).
 */
export class NamePage extends BaseAppPage {
  readonly path = "/example";

  // Declare locators as private readonly; resolve with role/label queries.
  private readonly title: Locator;
  private readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole("heading", { level: 1 });
    this.submit = page.getByRole("button", { name: /submit/i });
  }

  // Expose intent, not locators. Return meaningful values.
  async titleText(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? "";
  }

  async submitForm(): Promise<void> {
    await this.submit.click();
  }
}
