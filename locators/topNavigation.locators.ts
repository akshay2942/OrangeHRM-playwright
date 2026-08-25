import type { Page } from '@playwright/test';

export const topNavigationLocators = (page: Page) => ({
  topbar: page.locator('.oxd-topbar-body-nav'),
  topMenuItem: (name: string) => page.locator('.oxd-topbar-body-nav').getByRole('link', { name }),
  topMenuItemByText: (name: string) => page.locator('.oxd-topbar-body-nav').getByText(name, { exact: true }),
});
