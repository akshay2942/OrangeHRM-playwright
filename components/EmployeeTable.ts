import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { employeeTableLocators } from '../locators/employeeTable.locators.js';

/**
 * Reusable data table component for employee/user listings.
 */
export class EmployeeTable extends BasePage {
  readonly locators: ReturnType<typeof employeeTableLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = employeeTableLocators(page);
  }

  async getRowCount() {
    return this.locators.rows.count();
  }

  async hasRowWithText(text: string) {
    const row = this.locators.rowByText(text).first();
    await row.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    return (await this.locators.rowByText(text).count()) > 0;
  }

  async editRow(text: string) {
    await this.safeClick(this.locators.editButtonInRow(text));
  }

  async deleteRow(text: string) {
    await this.safeClick(this.locators.deleteButtonInRow(text));
  }

  async verifyNoRecords() {
    await this.verifyVisible(this.locators.noRecords);
  }
}
