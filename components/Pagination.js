import { BasePage } from '../pages/BasePage.js';
import { paginationLocators } from '../locators/pagination.locators.js';

/**
 * Table pagination component.
 */
export class Pagination extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = paginationLocators(page);
  }

  async next() {
    await this.safeClick(this.locators.nextButton);
  }

  async previous() {
    await this.safeClick(this.locators.previousButton);
  }

  /**
   * @param {number} pageNumber
   */
  async goToPage(pageNumber) {
    await this.safeClick(this.locators.pageButton(pageNumber).first());
  }
}
