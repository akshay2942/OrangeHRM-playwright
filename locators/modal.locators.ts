import type { Page } from '@playwright/test';

export const modalLocators = (page: Page) => ({
  modal: page.locator('.oxd-dialog-sheet, [role="dialog"]'),
  title: page.locator('.oxd-sheet .oxd-text--h6, [role="dialog"] h6'),
  body: page.locator('.oxd-dialog-sheet .oxd-text, [role="dialog"]'),
});
