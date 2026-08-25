import type { Page } from '@playwright/test';

export const paginationLocators = (page: Page) => ({
  container: page.locator('.oxd-pagination'),
  nextButton: page.locator('.oxd-pagination--ul button').filter({ hasText: /next|›|»/i }).first(),
  previousButton: page
    .locator('.oxd-pagination--ul button')
    .filter({ hasText: /previous|‹|«/i })
    .first(),
  pageButton: (pageNumber: string | number) =>
    page.locator('.oxd-pagination--ul button').filter({ hasText: String(pageNumber) }),
});
