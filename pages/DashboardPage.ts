import type { Page } from '@playwright/test';
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
  readonly locators: ReturnType<typeof dashboardLocators>;
  readonly leftMenu: LeftMenu;
  readonly header: Header;
  readonly userMenu: UserMenu;

  constructor(page: Page) {
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

  async getProfileName() {
    return this.getText(this.locators.userName);
  }

  async getQuickLaunchCount() {
    return this.locators.quickLaunchItems.count();
  }

  async isSideMenuVisible() {
    return this.locators.sideMenu.isVisible();
  }
}
