import { BasePage } from '../pages/BasePage.js';
import { headerLocators } from '../locators/header.locators.js';

/**
 * Application header component.
 */
export class Header extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = headerLocators(page);
  }

  /**
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return this.getText(this.locators.pageTitle.first());
  }

  async verifyHeaderVisible() {
    await this.verifyVisible(this.locators.header);
  }
}
