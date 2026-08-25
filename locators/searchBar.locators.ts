import type { Page } from '@playwright/test';

export const searchBarLocators = (page: Page) => ({
  searchInput: page.getByPlaceholder('Search'),
});
