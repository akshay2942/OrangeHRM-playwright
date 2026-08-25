import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { leftMenuLocators } from '../locators/leftMenu.locators.js';

/**
 * Reusable left navigation menu component.
 */
export class LeftMenu extends BasePage {
  readonly locators: ReturnType<typeof leftMenuLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = leftMenuLocators(page);
  }

  async navigateTo(name: string) {
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

  async isVisible() {
    return this.locators.sideMenu.isVisible();
  }
}
