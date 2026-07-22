import { BasePage } from './BasePage.js';
import { employeeListLocators } from '../locators/employeeList.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { EmployeeTable } from '../components/EmployeeTable.js';
import { ConfirmationDialog } from '../components/ConfirmationDialog.js';
import { Toast } from '../components/Toast.js';
import { Pagination } from '../components/Pagination.js';

/**
 * PIM > Employee List page actions.
 */
export class EmployeeListPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = employeeListLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.table = new EmployeeTable(page);
    this.confirmDialog = new ConfirmationDialog(page);
    this.toast = new Toast(page);
    this.pagination = new Pagination(page);
  }

  async open() {
    await this.goto(URLS.PIM_EMPLOYEE_LIST);
    await this.waitForElement(this.locators.heading);
  }

  async openViaMenu() {
    await this.leftMenu.openPim();
    await this.waitForElement(this.locators.heading);
  }

  /**
   * @param {string} name
   */
  async searchByName(name) {
    await this.safeFill(this.locators.employeeNameInput, name);
    const option = this.page
      .locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
      .filter({ hasText: name })
      .first();
    if (await option.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.safeClick(option);
    }
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  /**
   * @param {string} employeeId
   */
  async searchById(employeeId) {
    await this.safeFill(this.locators.employeeIdInput, employeeId);
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  async resetSearch() {
    await this.safeClick(this.locators.resetButton);
  }

  async clickAdd() {
    await this.safeClick(this.locators.addButton);
  }

  /**
   * @param {string} text
   */
  async editEmployee(text) {
    await this.table.editRow(text);
  }

  /**
   * @param {string} text
   */
  async deleteEmployee(text) {
    await this.table.deleteRow(text);
    await this.confirmDialog.waitForOpen();
    await this.confirmDialog.confirm();
  }
}
