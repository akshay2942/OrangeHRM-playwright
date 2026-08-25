import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { buzzLocators } from '../locators/buzz.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * Buzz social feed page actions.
 */
export class BuzzPage extends BasePage {
  readonly locators: ReturnType<typeof buzzLocators>;
  readonly leftMenu: LeftMenu;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    this.locators = buzzLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.toast = new Toast(page);
  }

  async open() {
    await this.goto(URLS.BUZZ);
    await this.waitForElement(this.locators.heading);
  }

  async openViaMenu() {
    await this.leftMenu.openBuzz();
    await this.waitForElement(this.locators.heading);
  }

  async createPost(text: string) {
    await this.safeFill(this.locators.postInput, text);
    await this.safeClick(this.locators.postButton);
  }

  async hasPost(text: string) {
    return (await this.locators.postByText(text).count()) > 0;
  }
}
