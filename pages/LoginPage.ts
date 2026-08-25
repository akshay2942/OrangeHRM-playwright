import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { loginLocators } from '../locators/login.locators.js';
import { URLS } from '../constants/urls.js';

/**
 * Login page — atomic actions and getters only.
 */
export class LoginPage extends BasePage {
  readonly locators: ReturnType<typeof loginLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = loginLocators(page);
  }

  async open() {
    await this.goto(URLS.LOGIN);
    await this.waitForElement(this.locators.usernameInput);
  }

  async enterUsername(username: string) {
    await this.safeFill(this.locators.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.safeFill(this.locators.passwordInput, password);
  }

  async clearUsername() {
    await this.clear(this.locators.usernameInput);
  }

  async clearPassword() {
    await this.clear(this.locators.passwordInput);
  }

  async clickLogin() {
    await this.safeClick(this.locators.loginButton);
  }

  async clickForgotPassword() {
    await this.safeClick(this.locators.forgotPasswordLink);
  }

  async getErrorMessage() {
    await this.waitForElement(this.locators.errorAlert);
    return this.getText(this.locators.errorAlert);
  }

  async getRequiredFieldCount() {
    await this.locators.requiredMessages.first().waitFor({ state: 'visible' }).catch(() => {});
    return this.locators.requiredMessages.count();
  }

  async areRequiredMessagesVisible() {
    return this.locators.requiredMessages.first().isVisible();
  }

  async isLoginButtonVisible() {
    return this.locators.loginButton.isVisible();
  }
}
