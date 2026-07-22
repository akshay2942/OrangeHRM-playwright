/**
 * Toast / alert notification locators.
 * @param {import('@playwright/test').Page} page
 */
export const toastLocators = (page) => ({
  toast: page.locator('.oxd-toast'),
  toastTitle: page.locator('.oxd-toast-content-text'),
  toastClose: page.locator('.oxd-toast-close'),
});
