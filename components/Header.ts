import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { headerLocators } from '../locators/header.locators.js';

/**
 * Application header component.
 */
export class Header extends BasePage {
  readonly locators: ReturnType<typeof headerLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = headerLocators(page);
  }

  async getPageTitle() {
    return this.getText(this.locators.pageTitle.first());
  }

  async verifyHeaderVisible() {
    await this.verifyVisible(this.locators.header);
  }
}
