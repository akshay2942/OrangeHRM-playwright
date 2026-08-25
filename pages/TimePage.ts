import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { timeLocators } from '../locators/time.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * Time module page actions.
 */
export class TimePage extends BasePage {
  readonly locators: ReturnType<typeof timeLocators>;
  readonly leftMenu: LeftMenu;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    this.locators = timeLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.toast = new Toast(page);
  }

  async open() {
    await this.goto(URLS.TIME_TIMESHEETS);
    await this.waitForLoad();
  }

  async openViaMenu() {
    await this.leftMenu.openTime();
    await this.waitForLoad();
  }

  async viewEmployeeTimesheet(employeeName: string) {
    await this.selectAutocomplete(this.locators.employeeNameInput, employeeName);
    await this.safeClick(this.locators.viewButton);
    await this.waitForLoad();
  }

  async openAttendance() {
    await this.safeClick(this.locators.attendanceTab);
    await this.safeClick(this.locators.attendanceMyRecords);
    await this.waitForLoad();
  }

  async openProjectInfo() {
    await this.safeClick(this.locators.projectInfoTab);
    await this.waitForLoad();
  }

  async clickAdd() {
    await this.safeClick(this.locators.addButton);
  }

  async save() {
    await this.safeClick(this.locators.saveButton);
  }
}
