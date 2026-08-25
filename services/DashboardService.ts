import type { DashboardPage } from '../pages/DashboardPage.js';

export interface DashboardServiceDeps {
  dashboardPage: DashboardPage;
}

/**
 * Dashboard workflows and getters.
 */
export class DashboardService {
  readonly dashboardPage: DashboardPage;

  constructor({ dashboardPage }: DashboardServiceDeps) {
    this.dashboardPage = dashboardPage;
  }

  async open() {
    await this.dashboardPage.open();
    await this.dashboardPage.waitForDashboard();
  }

  async getProfileName() {
    return this.dashboardPage.getProfileName();
  }

  async getQuickLaunchCount() {
    return this.dashboardPage.getQuickLaunchCount();
  }

  async isSideMenuVisible() {
    return this.dashboardPage.isSideMenuVisible();
  }

  async isDashboardHeadingVisible() {
    return this.dashboardPage.locators.dashboardHeading.isVisible();
  }

  async isUserDropdownVisible() {
    return this.dashboardPage.locators.userDropdown.isVisible();
  }

  async isAdminMenuVisible() {
    return this.dashboardPage.leftMenu.locators.admin.isVisible();
  }

  async isPimMenuVisible() {
    return this.dashboardPage.leftMenu.locators.pim.isVisible();
  }

  async isLeaveMenuVisible() {
    return this.dashboardPage.leftMenu.locators.leave.isVisible();
  }

  async isQuickLaunchVisible() {
    return this.dashboardPage.locators.quickLaunch.isVisible();
  }
}
