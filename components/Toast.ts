import { expect , type Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { toastLocators } from '../locators/toast.locators.js';
import { TIMEOUTS } from '../constants/timeouts.js';

/**
 * Toast notification component.
 */
export class Toast extends BasePage {
  readonly locators: ReturnType<typeof toastLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = toastLocators(page);
  }

  async waitForSuccess(message = /Success/i) {
    await this.waitForElement(this.locators.toast.first(), {
      state: 'visible',
      timeout: TIMEOUTS.MEDIUM,
    });
    if (message) {
      await expect(this.locators.toast.first()).toContainText(message);
    }
  }

  async getMessage() {
    await this.waitForElement(this.locators.toastTitle.first());
    return this.getText(this.locators.toastTitle.first());
  }
}
