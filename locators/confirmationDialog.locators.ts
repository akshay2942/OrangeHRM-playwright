import type { Page } from '@playwright/test';

export const confirmationDialogLocators = (page: Page) => ({
  dialog: page.locator('.oxd-dialog-sheet, .orangehrm-dialog-popup').filter({ hasText: /Sure|Delete|Confirm/i }),
  title: page.locator('.orangehrm-dialog-popup .oxd-text--card-title, .oxd-dialog-sheet .oxd-text--card-title'),
  yesButton: page.getByRole('button', { name: 'Yes, Delete' }),
  noButton: page.getByRole('button', { name: 'No, Cancel' }),
  confirmButton: page.getByRole('button', { name: /Yes/i }),
  cancelButton: page.getByRole('button', { name: /No, Cancel/i }),
});
