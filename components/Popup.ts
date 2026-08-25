import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { popupLocators } from '../locators/popup.locators.js';

/**
 * Generic popup component.
 */
export class Popup extends BasePage {
  readonly locators: ReturnType<typeof popupLocators>;

  constructor(page: Page) {
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
