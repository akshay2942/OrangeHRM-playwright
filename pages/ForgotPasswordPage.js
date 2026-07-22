import { BasePage } from './BasePage.js';
import { forgotPasswordLocators } from '../locators/forgotPassword.locators.js';
import { URLS } from '../constants/urls.js';

/**
 * Forgot password page actions.
 */
export class ForgotPasswordPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = forgotPasswordLocators(page);
  }

  async open() {
    await this.goto(URLS.FORGOT_PASSWORD);
    await this.waitForElement(this.locators.usernameInput);
  }

  /**
   * @param {string} username
   */
  async requestReset(username) {
    await this.safeFill(this.locators.usernameInput, username);
    await this.safeClick(this.locators.resetButton);
  }
}
