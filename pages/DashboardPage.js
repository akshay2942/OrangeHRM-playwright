import { BasePage } from './BasePage.js';
import { dashboardLocators } from '../locators/dashboard.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Header } from '../components/Header.js';
import { UserMenu } from '../components/UserMenu.js';

/**
 * Dashboard page actions.
 */
export class DashboardPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = dashboardLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.header = new Header(page);
    this.userMenu = new UserMenu(page);
  }

  async open() {
    await this.goto(URLS.DASHBOARD);
    await this.waitForLoad();
  }

  async waitForDashboard() {
    await this.waitForElement(this.locators.dashboardHeading);
  }

  /**
   * @returns {Promise<string>}
   */
  async getProfileName() {
    return this.getText(this.locators.userName);
  }

  /**
   * @returns {Promise<number>}
   */
  async getQuickLaunchCount() {
    return this.locators.quickLaunchItems.count();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isSideMenuVisible() {
    return this.locators.sideMenu.isVisible();
  }
}
