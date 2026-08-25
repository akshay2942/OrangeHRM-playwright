import type { Page } from '@playwright/test';
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
  readonly locators: ReturnType<typeof employeeListLocators>;
  readonly leftMenu: LeftMenu;
  readonly table: EmployeeTable;
  readonly confirmDialog: ConfirmationDialog;
  readonly toast: Toast;
  readonly pagination: Pagination;

  constructor(page: Page) {
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

  async searchByName(name: string) {
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

  async searchById(employeeId: string) {
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

  async editEmployee(text: string) {
    await this.table.editRow(text);
  }

  async deleteEmployee(text: string) {
    await this.table.deleteRow(text);
    await this.confirmDialog.waitForOpen();
    await this.confirmDialog.confirm();
  }
}
