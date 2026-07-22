import { BasePage } from '../pages/BasePage.js';
import { userMenuLocators } from '../locators/userMenu.locators.js';

/**
 * User profile dropdown component.
 */
export class UserMenu extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = userMenuLocators(page);
  }

  async open() {
    await this.safeClick(this.locators.userDropdown);
  }

  /**
   * @returns {Promise<string>}
   */
  async getUserName() {
    return this.getText(this.locators.userName);
  }

  async logout() {
    await this.open();
    await this.safeClick(this.locators.logout);
    await this.waitForLoad();
  }
}
