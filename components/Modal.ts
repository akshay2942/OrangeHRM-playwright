import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { modalLocators } from '../locators/modal.locators.js';

/**
 * Modal dialog component.
 */
export class Modal extends BasePage {
  readonly locators: ReturnType<typeof modalLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = modalLocators(page);
  }

  async waitForOpen() {
    await this.waitForElement(this.locators.modal.first());
  }

  async getTitle() {
    return this.getText(this.locators.title.first());
  }
}
