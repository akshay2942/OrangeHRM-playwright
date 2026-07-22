import { BasePage } from '../pages/BasePage.js';
import { modalLocators } from '../locators/modal.locators.js';

/**
 * Modal dialog component.
 */
export class Modal extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = modalLocators(page);
  }

  async waitForOpen() {
    await this.waitForElement(this.locators.modal.first());
  }

  /**
   * @returns {Promise<string>}
   */
  async getTitle() {
    return this.getText(this.locators.title.first());
  }
}
