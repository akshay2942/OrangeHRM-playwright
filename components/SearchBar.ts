import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { searchBarLocators } from '../locators/searchBar.locators.js';

/**
 * Side menu search bar component.
 */
export class SearchBar extends BasePage {
  readonly locators: ReturnType<typeof searchBarLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = searchBarLocators(page);
  }

  async search(text: string) {
    await this.safeFill(this.locators.searchInput, text);
  }

  async clearSearch() {
    await this.clear(this.locators.searchInput);
  }
}
