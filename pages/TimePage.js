import { BasePage } from './BasePage.js';
import { timeLocators } from '../locators/time.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * Time module page actions.
 */
export class TimePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
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

  /**
   * @param {string} employeeName
   */
  async viewEmployeeTimesheet(employeeName) {
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
