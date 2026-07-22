import { BasePage } from '../pages/BasePage.js';
import { topNavigationLocators } from '../locators/topNavigation.locators.js';

/**
 * Top bar secondary navigation component.
 */
export class TopNavigation extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = topNavigationLocators(page);
  }

  /**
   * @param {string} name
   */
  async clickMenuItem(name) {
    const byRole = this.locators.topMenuItem(name);
    if (await byRole.count()) {
      await this.safeClick(byRole.first());
      return;
    }
    await this.safeClick(this.locators.topMenuItemByText(name).first());
  }
}
