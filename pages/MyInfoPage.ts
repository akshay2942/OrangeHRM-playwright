import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { myInfoLocators } from '../locators/myInfo.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * My Info page actions.
 */
export class MyInfoPage extends BasePage {
  readonly locators: ReturnType<typeof myInfoLocators>;
  readonly leftMenu: LeftMenu;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    this.locators = myInfoLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.toast = new Toast(page);
  }

  async open() {
    await this.goto(URLS.MY_INFO);
    await this.waitForLoad();
  }

  async openViaMenu() {
    await this.leftMenu.openMyInfo();
    await this.waitForLoad();
  }

  async openPersonalDetails() {
    await this.safeClick(this.locators.personalDetails);
  }

  async openContactDetails() {
    await this.safeClick(this.locators.contactDetails);
  }

  async updatePersonalDetails(data: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
  }) {
    if (data.firstName) {
      await this.safeFill(this.locators.firstNameInput, data.firstName);
    }
    if (data.middleName) {
      await this.safeFill(this.locators.middleNameInput, data.middleName);
    }
    if (data.lastName) {
      await this.safeFill(this.locators.lastNameInput, data.lastName);
    }
    await this.safeClick(this.locators.saveButton);
  }
}
