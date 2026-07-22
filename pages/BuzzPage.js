import { BasePage } from './BasePage.js';
import { buzzLocators } from '../locators/buzz.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { Toast } from '../components/Toast.js';

/**
 * Buzz social feed page actions.
 */
export class BuzzPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
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

  /**
   * @param {string} text
   */
  async createPost(text) {
    await this.safeFill(this.locators.postInput, text);
    await this.safeClick(this.locators.postButton);
  }

  /**
   * @param {string} text
   * @returns {Promise<boolean>}
   */
  async hasPost(text) {
    return (await this.locators.postByText(text).count()) > 0;
  }
}
