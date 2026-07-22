/**
 * Pagination control locators.
 * @param {import('@playwright/test').Page} page
 */
export const paginationLocators = (page) => ({
  container: page.locator('.oxd-pagination'),
  nextButton: page.locator('.oxd-pagination--ul button').filter({ hasText: /next|›|»/i }).first(),
  previousButton: page
    .locator('.oxd-pagination--ul button')
    .filter({ hasText: /previous|‹|«/i })
    .first(),
  pageButton: (pageNumber) =>
    page.locator('.oxd-pagination--ul button').filter({ hasText: String(pageNumber) }),
});
