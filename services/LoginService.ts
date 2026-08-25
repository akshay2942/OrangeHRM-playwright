import { logger } from '../utils/logger.js';
import type { LoginPage } from '../pages/LoginPage.js';
import type { DashboardPage } from '../pages/DashboardPage.js';
import type { LogoutPage } from '../pages/LogoutPage.js';
import type { ForgotPasswordPage } from '../pages/ForgotPasswordPage.js';

export interface LoginServiceDeps {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  logoutPage: LogoutPage;
  forgotPasswordPage: ForgotPasswordPage;
}

/**
 * Login / auth workflows composed from page objects.
 */
export class LoginService {
  readonly loginPage: LoginPage;
  readonly dashboardPage: DashboardPage;
  readonly logoutPage: LogoutPage;
  readonly forgotPasswordPage: ForgotPasswordPage;

  constructor({ loginPage, dashboardPage, logoutPage, forgotPasswordPage }: LoginServiceDeps) {
    this.loginPage = loginPage;
    this.dashboardPage = dashboardPage;
    this.logoutPage = logoutPage;
    this.forgotPasswordPage = forgotPasswordPage;
  }

  async openLoginPage() {
    await this.loginPage.open();
  }

  async loginAs(username: string, password: string) {
    logger.info('Performing login', { username });
    await this.loginPage.enterUsername(username);
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickLogin();
    await this.loginPage.waitForLoad();
  }

  async loginAndWaitForDashboard(username: string, password: string) {
    await this.loginAs(username, password);
    await this.dashboardPage.waitForDashboard();
  }

  async attemptLoginWithEmptyUsername(password: string) {
    await this.loginPage.clearUsername();
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickLogin();
  }

  async attemptLoginWithEmptyPassword(username: string) {
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

  async loginAndLogout(username: string, password: string) {
    await this.loginAndWaitForDashboard(username, password);
    await this.logoutPage.logout();
  }

  async getErrorMessage() {
    return this.loginPage.getErrorMessage();
  }

  async getRequiredFieldCount() {
    return this.loginPage.getRequiredFieldCount();
  }

  async areRequiredMessagesVisible() {
    return this.loginPage.areRequiredMessagesVisible();
  }

  async isLoginButtonVisible() {
    return this.loginPage.isLoginButtonVisible();
  }

  async isForgotPasswordFormVisible() {
    const resetVisible = await this.forgotPasswordPage.locators.resetButton.isVisible();
    const titleVisible = await this.forgotPasswordPage.locators.title.isVisible();
    return resetVisible && titleVisible;
  }
}
