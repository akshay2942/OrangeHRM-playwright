import type { Page } from '@playwright/test';

export const popupLocators = (page: Page) => ({
  popup: page.locator('.oxd-dialog-container, [role="dialog"]'),
  closeButton: page.locator('.oxd-dialog-close-button, button[aria-label="Close"]'),
});
