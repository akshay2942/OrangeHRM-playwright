import { BasePage } from './BasePage.js';
import { loginLocators } from '../locators/login.locators.js';
import { URLS } from '../constants/urls.js';

/**
 * Login page — atomic actions and getters only.
 */
export class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = loginLocators(page);
  }

  async open() {
    await this.goto(URLS.LOGIN);
    await this.waitForElement(this.locators.usernameInput);
  }

  /**
   * @param {string} username
   */
  async enterUsername(username) {
    await this.safeFill(this.locators.usernameInput, username);
  }

  /**
   * @param {string} password
   */
  async enterPassword(password) {
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

  /**
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    await this.waitForElement(this.locators.errorAlert);
    return this.getText(this.locators.errorAlert);
  }

  /**
   * @returns {Promise<number>}
   */
  async getRequiredFieldCount() {
    await this.locators.requiredMessages.first().waitFor({ state: 'visible' }).catch(() => {});
    return this.locators.requiredMessages.count();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async areRequiredMessagesVisible() {
    return this.locators.requiredMessages.first().isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isLoginButtonVisible() {
    return this.locators.loginButton.isVisible();
  }
}
