import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { UserMenu } from '../components/UserMenu.js';
import { loginLocators } from '../locators/login.locators.js';

/**
 * Logout actions via the user dropdown menu.
 */
export class LogoutPage extends BasePage {
  readonly loginLocators: ReturnType<typeof loginLocators>;
  readonly userMenu: UserMenu;

  constructor(page: Page) {
    super(page);
    this.userMenu = new UserMenu(page);
    this.loginLocators = loginLocators(page);
  }

  async logout() {
    await this.userMenu.logout();
    await this.waitForElement(this.loginLocators.loginButton);
  }
}
