/**
 * User dropdown menu locators.
 * @param {import('@playwright/test').Page} page
 */
export const userMenuLocators = (page) => ({
  userDropdown: page.locator('.oxd-userdropdown-tab'),
  userName: page.locator('.oxd-userdropdown-name'),
  about: page.getByRole('menuitem', { name: 'About' }),
  support: page.getByRole('menuitem', { name: 'Support' }),
  changePassword: page.getByRole('menuitem', { name: 'Change Password' }),
  logout: page.getByRole('menuitem', { name: 'Logout' }),
});
