import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { leaveLocators } from '../locators/leave.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { EmployeeTable } from '../components/EmployeeTable.js';
import { Toast } from '../components/Toast.js';

/**
 * Leave module page actions (apply / list / search).
 */
export class LeavePage extends BasePage {
  readonly locators: ReturnType<typeof leaveLocators>;
  readonly leftMenu: LeftMenu;
  readonly table: EmployeeTable;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    this.locators = leaveLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.table = new EmployeeTable(page);
    this.toast = new Toast(page);
  }

  async openLeaveList() {
    await this.goto(URLS.LEAVE_LIST);
    await this.waitForLoad();
  }

  async openApply() {
    await this.goto(URLS.LEAVE_APPLY);
    await this.waitForLoad();
  }

  async openViaMenu() {
    await this.leftMenu.openLeave();
    await this.waitForLoad();
  }

  async searchLeave(employeeName?: string) {
    if (employeeName) {
      await this.selectAutocomplete(this.locators.employeeNameInput, employeeName);
    }
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  /** Cancels the first leave row matching text via Cancel action if present. */
  async cancelLeaveByText(text: string) {
    const row = this.table.locators.rowByText(text).first();
    await this.waitForElement(row);
    const cancel = row.getByRole('button', { name: /Cancel/i }).first();
    if (await cancel.count()) {
      await this.safeClick(cancel);
    }
  }
}
