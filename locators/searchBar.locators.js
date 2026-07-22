/**
 * Global search bar locators.
 * @param {import('@playwright/test').Page} page
 */
export const searchBarLocators = (page) => ({
  searchInput: page.getByPlaceholder('Search'),
});
