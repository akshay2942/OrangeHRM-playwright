import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { maintenanceLocators } from '../locators/maintenance.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { envConfig } from '../config/env.config.js';

/**
 * Maintenance module page actions.
 */
export class MaintenancePage extends BasePage {
  readonly locators: ReturnType<typeof maintenanceLocators>;
  readonly leftMenu: LeftMenu;

  constructor(page: Page) {
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

  /** Confirms admin password gate when present. */
  async confirmAccess(password = envConfig.password) {
    if (await this.locators.passwordInput.isVisible().catch(() => false)) {
      await this.safeFill(this.locators.passwordInput, password);
      await this.safeClick(this.locators.confirmButton);
      await this.waitForLoad();
    }
  }
}
