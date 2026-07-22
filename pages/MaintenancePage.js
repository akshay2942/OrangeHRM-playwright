import { BasePage } from './BasePage.js';
import { maintenanceLocators } from '../locators/maintenance.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { envConfig } from '../config/env.config.js';

/**
 * Maintenance module page actions.
 */
export class MaintenancePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = maintenanceLocators(page);
    this.leftMenu = new LeftMenu(page);
  }

  async open() {
    await this.goto(URLS.MAINTENANCE);
    await this.waitForLoad();
  }

  async openViaMenu() {
    await this.leftMenu.openMaintenance();
    await this.waitForLoad();
  }

  /**
   * Confirms admin password gate when present.
   * @param {string} [password]
   */
  async confirmAccess(password = envConfig.password) {
    if (await this.locators.passwordInput.isVisible().catch(() => false)) {
      await this.safeFill(this.locators.passwordInput, password);
      await this.safeClick(this.locators.confirmButton);
      await this.waitForLoad();
    }
  }
}
