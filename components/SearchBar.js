import { BasePage } from '../pages/BasePage.js';
import { searchBarLocators } from '../locators/searchBar.locators.js';

/**
 * Side menu search bar component.
 */
export class SearchBar extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = searchBarLocators(page);
  }

  /**
   * @param {string} text
   */
  async search(text) {
    await this.safeFill(this.locators.searchInput, text);
  }

  async clearSearch() {
    await this.clear(this.locators.searchInput);
  }
}
