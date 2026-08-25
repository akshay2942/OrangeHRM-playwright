import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { assignLeaveLocators } from '../locators/assignLeave.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * Leave > Assign Leave page actions.
 */
export class AssignLeavePage extends BasePage {
  readonly locators: ReturnType<typeof assignLeaveLocators>;
  readonly leftMenu: LeftMenu;
  readonly toast: Toast;

  constructor(page: Page) {
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
