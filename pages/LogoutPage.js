import { BasePage } from './BasePage.js';
import { UserMenu } from '../components/UserMenu.js';
import { loginLocators } from '../locators/login.locators.js';

/**
 * Logout actions via the user dropdown menu.
 */
export class LogoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.userMenu = new UserMenu(page);
    this.loginLocators = loginLocators(page);
  }

  async logout() {
    await this.userMenu.logout();
    await this.waitForElement(this.loginLocators.loginButton);
  }
}
