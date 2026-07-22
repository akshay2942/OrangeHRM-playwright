import { BasePage } from '../pages/BasePage.js';
import { popupLocators } from '../locators/popup.locators.js';

/**
 * Generic popup component.
 */
export class Popup extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = popupLocators(page);
  }

  async waitForOpen() {
    await this.waitForElement(this.locators.popup.first());
  }

  async close() {
    await this.safeClick(this.locators.closeButton.first());
  }
}
