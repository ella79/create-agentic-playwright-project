import { expect, type Page, type Locator } from "@playwright/test";
import { BaseAppPage } from "../baseAppPage.js";
import { url } from "../../url.js";

/**
 * Example page object. Locators are readonly, resolved by the priority in the
 * page-object skill (role/label/placeholder/text, then testId, CSS last with a
 * reason). Navigation goes through gotoHomePage(): it uses the url map and asserts
 * a landmark, so a passing goto means the page really loaded.
 */
export class HomePage extends BaseAppPage {
  private readonly featuresHeading: Locator;
  private readonly getStarted: Locator;

  constructor(page: Page) {
    super(page);
    this.featuresHeading = page.getByRole("heading", { level: 1 });
    this.getStarted = page.getByRole("link", { name: /get started/i });
  }

  async gotoHomePage(): Promise<void> {
    await this.goto(url.home);
    await expect(this.featuresHeading).toBeVisible();
  }

  async headingText(): Promise<string> {
    return (await this.featuresHeading.textContent())?.trim() ?? "";
  }

  async startOnboarding(): Promise<void> {
    await this.getStarted.click();
  }
}
