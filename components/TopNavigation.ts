import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { topNavigationLocators } from '../locators/topNavigation.locators.js';

/**
 * Top bar secondary navigation component.
 */
export class TopNavigation extends BasePage {
  readonly locators: ReturnType<typeof topNavigationLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = topNavigationLocators(page);
  }

  async clickMenuItem(name: string) {
    const byRole = this.locators.topMenuItem(name);
    if (await byRole.count()) {
      await this.safeClick(byRole.first());
      return;
    }
    await this.safeClick(this.locators.topMenuItemByText(name).first());
  }
}
