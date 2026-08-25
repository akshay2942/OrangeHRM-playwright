import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { adminLocators } from '../locators/admin.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { EmployeeTable } from '../components/EmployeeTable.js';
import { ConfirmationDialog } from '../components/ConfirmationDialog.js';
import { Toast } from '../components/Toast.js';
import { Pagination } from '../components/Pagination.js';

/**
 * Admin > System Users page actions.
 */
export class AdminPage extends BasePage {
  readonly locators: ReturnType<typeof adminLocators>;
  readonly leftMenu: LeftMenu;
  readonly table: EmployeeTable;
  readonly confirmDialog: ConfirmationDialog;
  readonly toast: Toast;
  readonly pagination: Pagination;

  constructor(page: Page) {
    super(page);
    this.locators = adminLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.table = new EmployeeTable(page);
    this.confirmDialog = new ConfirmationDialog(page);
    this.toast = new Toast(page);
    this.pagination = new Pagination(page);
  }

  async open() {
    await this.goto(URLS.ADMIN_USERS);
    await this.waitForElement(this.locators.heading);
  }

  async openViaMenu() {
    await this.leftMenu.openAdmin();
    await this.waitForElement(this.locators.heading);
  }

  async clickAdd() {
    await this.safeClick(this.locators.addButton);
  }

  async searchByUsername(username: string) {
    await this.safeFill(this.locators.usernameSearch, username);
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  async resetSearch() {
    await this.safeClick(this.locators.resetButton);
  }

  async fillUserForm(data: {
    userRole: string;
    employeeName: string;
    username: string;
    password: string;
    status?: string;
  }) {
    await this.selectOxdOption(this.locators.userRoleDropdown, data.userRole);
    await this.selectAutocomplete(this.locators.employeeNameInput, data.employeeName);
    if (data.status) {
      await this.selectOxdOption(this.locators.statusDropdown, data.status);
    }
    await this.safeFill(this.locators.usernameInput, data.username);
    await this.safeFill(this.locators.passwordInput, data.password);
    await this.safeFill(this.locators.confirmPasswordInput, data.password);
  }

  async save() {
    await this.safeClick(this.locators.saveButton);
  }

  async editUser(username: string) {
    await this.table.editRow(username);
  }

  async deleteUser(username: string) {
    await this.table.deleteRow(username);
    await this.confirmDialog.waitForOpen();
    await this.confirmDialog.confirm();
  }
}
