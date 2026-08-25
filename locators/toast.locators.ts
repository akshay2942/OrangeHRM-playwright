import type { Page } from '@playwright/test';

export const toastLocators = (page: Page) => ({
  toast: page.locator('.oxd-toast'),
  toastTitle: page.locator('.oxd-toast-content-text'),
  toastClose: page.locator('.oxd-toast-close'),
});
