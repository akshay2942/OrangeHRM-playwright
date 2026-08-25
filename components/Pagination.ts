import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { paginationLocators } from '../locators/pagination.locators.js';

/**
 * Table pagination component.
 */
export class Pagination extends BasePage {
  readonly locators: ReturnType<typeof paginationLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = paginationLocators(page);
  }

  async next() {
    await this.safeClick(this.locators.nextButton);
  }

  async previous() {
    await this.safeClick(this.locators.previousButton);
  }

  async goToPage(pageNumber: string | number) {
    await this.safeClick(this.locators.pageButton(pageNumber).first());
  }
}
