/**
 * Dashboard workflows and getters.
 */
export class DashboardService {
  /**
   * @param {{ dashboardPage: import('../pages/DashboardPage.js').DashboardPage }} deps
   */
  constructor({ dashboardPage }) {
    this.dashboardPage = dashboardPage;
  }

  async open() {
    await this.dashboardPage.open();
    await this.dashboardPage.waitForDashboard();
  }

  /**
   * @returns {Promise<string>}
   */
  async getProfileName() {
    return this.dashboardPage.getProfileName();
  }

  /**
   * @returns {Promise<number>}
   */
  async getQuickLaunchCount() {
    return this.dashboardPage.getQuickLaunchCount();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isSideMenuVisible() {
    return this.dashboardPage.isSideMenuVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isDashboardHeadingVisible() {
    return this.dashboardPage.locators.dashboardHeading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isUserDropdownVisible() {
    return this.dashboardPage.locators.userDropdown.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isAdminMenuVisible() {
    return this.dashboardPage.leftMenu.locators.admin.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isPimMenuVisible() {
    return this.dashboardPage.leftMenu.locators.pim.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isLeaveMenuVisible() {
    return this.dashboardPage.leftMenu.locators.leave.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isQuickLaunchVisible() {
    return this.dashboardPage.locators.quickLaunch.isVisible();
  }
}
