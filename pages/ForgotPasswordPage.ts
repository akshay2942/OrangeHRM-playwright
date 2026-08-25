import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { forgotPasswordLocators } from '../locators/forgotPassword.locators.js';
import { URLS } from '../constants/urls.js';

/**
 * Forgot password page actions.
 */
export class ForgotPasswordPage extends BasePage {
  readonly locators: ReturnType<typeof forgotPasswordLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = forgotPasswordLocators(page);
  }

  async open() {
    await this.goto(URLS.FORGOT_PASSWORD);
    await this.waitForElement(this.locators.usernameInput);
  }

  async requestReset(username: string) {
    await this.safeFill(this.locators.usernameInput, username);
    await this.safeClick(this.locators.resetButton);
  }
}
