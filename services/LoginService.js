import { logger } from '../utils/logger.js';

/**
 * Login / auth workflows composed from page objects.
 */
export class LoginService {
  /**
   * @param {{
   *   loginPage: import('../pages/LoginPage.js').LoginPage,
   *   dashboardPage: import('../pages/DashboardPage.js').DashboardPage,
   *   logoutPage: import('../pages/LogoutPage.js').LogoutPage,
   *   forgotPasswordPage: import('../pages/ForgotPasswordPage.js').ForgotPasswordPage,
   * }} deps
   */
  constructor({ loginPage, dashboardPage, logoutPage, forgotPasswordPage }) {
    this.loginPage = loginPage;
    this.dashboardPage = dashboardPage;
    this.logoutPage = logoutPage;
    this.forgotPasswordPage = forgotPasswordPage;
  }

  async openLoginPage() {
    await this.loginPage.open();
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async loginAs(username, password) {
    logger.info('Performing login', { username });
    await this.loginPage.enterUsername(username);
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickLogin();
    await this.loginPage.waitForLoad();
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async loginAndWaitForDashboard(username, password) {
    await this.loginAs(username, password);
    await this.dashboardPage.waitForDashboard();
  }

  /**
   * @param {string} password
   */
  async attemptLoginWithEmptyUsername(password) {
    await this.loginPage.clearUsername();
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickLogin();
  }

  /**
   * @param {string} username
   */
  async attemptLoginWithEmptyPassword(username) {
    await this.loginPage.enterUsername(username);
    await this.loginPage.clearPassword();
    await this.loginPage.clickLogin();
  }

  async attemptLoginWithBothEmpty() {
    await this.loginPage.clearUsername();
    await this.loginPage.clearPassword();
    await this.loginPage.clickLogin();
  }

  async openForgotPassword() {
    await this.loginPage.clickForgotPassword();
    await this.forgotPasswordPage.waitForElement(
      this.forgotPasswordPage.locators.usernameInput,
    );
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async loginAndLogout(username, password) {
    await this.loginAndWaitForDashboard(username, password);
    await this.logoutPage.logout();
  }

  /**
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return this.loginPage.getErrorMessage();
  }

  /**
   * @returns {Promise<number>}
   */
  async getRequiredFieldCount() {
    return this.loginPage.getRequiredFieldCount();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async areRequiredMessagesVisible() {
    return this.loginPage.areRequiredMessagesVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isLoginButtonVisible() {
    return this.loginPage.isLoginButtonVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isForgotPasswordFormVisible() {
    const resetVisible = await this.forgotPasswordPage.locators.resetButton.isVisible();
    const titleVisible = await this.forgotPasswordPage.locators.title.isVisible();
    return resetVisible && titleVisible;
  }
}
