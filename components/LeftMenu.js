import { BasePage } from '../pages/BasePage.js';
import { leftMenuLocators } from '../locators/leftMenu.locators.js';

/**
 * Reusable left navigation menu component.
 */
export class LeftMenu extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = leftMenuLocators(page);
  }

  /**
   * @param {string} name
   */
  async navigateTo(name) {
    await this.safeClick(this.locators.menuItem(name));
    await this.waitForLoad();
  }

  async openAdmin() {
    await this.safeClick(this.locators.admin);
  }

  async openPim() {
    await this.safeClick(this.locators.pim);
  }

  async openLeave() {
    await this.safeClick(this.locators.leave);
  }

  async openTime() {
    await this.safeClick(this.locators.time);
  }

  async openRecruitment() {
    await this.safeClick(this.locators.recruitment);
  }

  async openMyInfo() {
    await this.safeClick(this.locators.myInfo);
  }

  async openPerformance() {
    await this.safeClick(this.locators.performance);
  }

  async openDashboard() {
    await this.safeClick(this.locators.dashboard);
  }

  async openDirectory() {
    await this.safeClick(this.locators.directory);
  }

  async openMaintenance() {
    await this.safeClick(this.locators.maintenance);
  }

  async openClaim() {
    await this.safeClick(this.locators.claim);
  }

  async openBuzz() {
    await this.safeClick(this.locators.buzz);
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    return this.locators.sideMenu.isVisible();
  }
}
