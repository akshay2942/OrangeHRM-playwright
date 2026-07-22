import { expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { toastLocators } from '../locators/toast.locators.js';
import { TIMEOUTS } from '../constants/timeouts.js';

/**
 * Toast notification component.
 */
export class Toast extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = toastLocators(page);
  }

  /**
   * @param {string|RegExp} [message]
   */
  async waitForSuccess(message = /Success/i) {
    await this.waitForElement(this.locators.toast.first(), {
      state: 'visible',
      timeout: TIMEOUTS.MEDIUM,
    });
    if (message) {
      await expect(this.locators.toast.first()).toContainText(message);
    }
  }

  /**
   * @returns {Promise<string>}
   */
  async getMessage() {
    await this.waitForElement(this.locators.toastTitle.first());
    return this.getText(this.locators.toastTitle.first());
  }
}
