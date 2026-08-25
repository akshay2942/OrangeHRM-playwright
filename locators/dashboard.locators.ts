import type { Page } from '@playwright/test';

export const dashboardLocators = (page: Page) => ({
  dashboardHeading: page.getByRole('heading', { name: 'Dashboard' }),
  userDropdown: page.locator('.oxd-userdropdown-tab'),
  userName: page.locator('.oxd-userdropdown-name'),
  quickLaunch: page.locator('.orangehrm-quick-launch'),
  quickLaunchItems: page.locator('.orangehrm-quick-launch-card'),
  sideMenu: page.getByRole('navigation', { name: 'Sidepanel' }),
  timeAtWork: page.getByText('Time at Work'),
  myActions: page.getByText('My Actions'),
});
