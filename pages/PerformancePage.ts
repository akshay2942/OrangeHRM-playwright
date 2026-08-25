import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { performanceLocators } from '../locators/performance.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { EmployeeTable } from '../components/EmployeeTable.js';

/**
 * Performance module page actions.
 */
export class PerformancePage extends BasePage {
  readonly locators: ReturnType<typeof performanceLocators>;
  readonly leftMenu: LeftMenu;
  readonly table: EmployeeTable;

  constructor(page: Page) {
    super(page);
    this.locators = performanceLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.table = new EmployeeTable(page);
  }

  async open() {
    await this.goto(URLS.PERFORMANCE);
    await this.waitForLoad();
  }

  async openViaMenu() {
    await this.leftMenu.openPerformance();
    await this.waitForLoad();
  }

  async searchByEmployee(employeeName: string) {
    await this.selectAutocomplete(this.locators.employeeNameInput, employeeName);
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  async resetSearch() {
    await this.safeClick(this.locators.resetButton);
  }
}
