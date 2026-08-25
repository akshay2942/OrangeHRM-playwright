import type { Page } from '@playwright/test';

export const userMenuLocators = (page: Page) => ({
  userDropdown: page.locator('.oxd-userdropdown-tab'),
  userName: page.locator('.oxd-userdropdown-name'),
  about: page.getByRole('menuitem', { name: 'About' }),
  support: page.getByRole('menuitem', { name: 'Support' }),
  changePassword: page.getByRole('menuitem', { name: 'Change Password' }),
  logout: page.getByRole('menuitem', { name: 'Logout' }),
});
