import { BasePage } from './BasePage.js';
import { assignLeaveLocators } from '../locators/assignLeave.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * Leave > Assign Leave page actions.
 */
export class AssignLeavePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = assignLeaveLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.toast = new Toast(page);
  }

  async open() {
    await this.goto(URLS.LEAVE_ASSIGN);
    await this.waitForElement(this.locators.heading);
  }
}
