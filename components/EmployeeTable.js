import { BasePage } from '../pages/BasePage.js';
import { employeeTableLocators } from '../locators/employeeTable.locators.js';

/**
 * Reusable data table component for employee/user listings.
 */
export class EmployeeTable extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = employeeTableLocators(page);
  }

  /**
   * @returns {Promise<number>}
   */
  async getRowCount() {
    return this.locators.rows.count();
  }

  /**
   * @param {string} text
   * @returns {Promise<boolean>}
   */
  async hasRowWithText(text) {
    const row = this.locators.rowByText(text).first();
    await row.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    return (await this.locators.rowByText(text).count()) > 0;
  }

  /**
   * @param {string} text
   */
  async editRow(text) {
    await this.safeClick(this.locators.editButtonInRow(text));
  }

  /**
   * @param {string} text
   */
  async deleteRow(text) {
    await this.safeClick(this.locators.deleteButtonInRow(text));
  }

  async verifyNoRecords() {
    await this.verifyVisible(this.locators.noRecords);
  }
}
