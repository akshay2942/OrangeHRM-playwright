/**
 * Header locators.
 * @param {import('@playwright/test').Page} page
 */
export const headerLocators = (page) => ({
  header: page.locator('header.oxd-topbar'),
  brandLink: page.locator('.oxd-brand'),
  pageTitle: page.locator('.oxd-topbar-header-breadcrumb, .oxd-topbar-header-title'),
});
