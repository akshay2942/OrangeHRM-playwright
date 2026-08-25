import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { pimLocators } from '../locators/pim.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * PIM > Add Employee page actions.
 */
export class PimPage extends BasePage {
  readonly locators: ReturnType<typeof pimLocators>;
  readonly leftMenu: LeftMenu;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    this.locators = pimLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.toast = new Toast(page);
  }

  async openAddEmployee() {
    await this.goto(URLS.PIM_ADD_EMPLOYEE);
    await this.waitForElement(this.locators.firstNameInput);
  }

  async openViaMenu() {
    await this.leftMenu.openPim();
    await this.waitForLoad();
  }

  async fillEmployeeForm(data: {
    firstName: string;
    lastName: string;
    middleName?: string;
    employeeId?: string;
    photoPath?: string;
  }) {
    await this.safeFill(this.locators.firstNameInput, data.firstName);
    if (data.middleName) {
      await this.safeFill(this.locators.middleNameInput, data.middleName);
    }
    await this.safeFill(this.locators.lastNameInput, data.lastName);
    if (data.employeeId) {
      await this.safeFill(this.locators.employeeIdInput, data.employeeId);
    }
    if (data.photoPath) {
      await this.uploadFile(this.locators.photographInput, data.photoPath);
    }
  }

  async save() {
    await this.safeClick(this.locators.saveButton);
  }
}
