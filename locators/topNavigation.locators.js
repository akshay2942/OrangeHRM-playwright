/**
 * Top navigation / breadcrumb locators.
 * @param {import('@playwright/test').Page} page
 */
export const topNavigationLocators = (page) => ({
  topbar: page.locator('.oxd-topbar-body-nav'),
  topMenuItem: (name) => page.locator('.oxd-topbar-body-nav').getByRole('link', { name }),
  topMenuItemByText: (name) => page.locator('.oxd-topbar-body-nav').getByText(name, { exact: true }),
});
