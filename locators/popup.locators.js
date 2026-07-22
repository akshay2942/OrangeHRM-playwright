/**
 * Generic popup locators.
 * @param {import('@playwright/test').Page} page
 */
export const popupLocators = (page) => ({
  popup: page.locator('.oxd-dialog-container, [role="dialog"]'),
  closeButton: page.locator('.oxd-dialog-close-button, button[aria-label="Close"]'),
});
