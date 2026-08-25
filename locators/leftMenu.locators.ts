import type { Page } from '@playwright/test';

export const leftMenuLocators = (page: Page) => ({
  sideMenu: page.getByRole('navigation', { name: 'Sidepanel' }),
  searchInput: page.getByPlaceholder('Search'),
  menuItem: (name: string) => page.getByRole('link', { name }),
  admin: page.getByRole('link', { name: 'Admin' }),
  pim: page.getByRole('link', { name: 'PIM' }),
  leave: page.getByRole('link', { name: 'Leave' }),
  time: page.getByRole('link', { name: 'Time' }),
  recruitment: page.getByRole('link', { name: 'Recruitment' }),
  myInfo: page.getByRole('link', { name: 'My Info' }),
  performance: page.getByRole('link', { name: 'Performance' }),
  dashboard: page.getByRole('link', { name: 'Dashboard' }),
  directory: page.getByRole('link', { name: 'Directory' }),
  maintenance: page.getByRole('link', { name: 'Maintenance' }),
  claim: page.getByRole('link', { name: 'Claim' }),
  buzz: page.getByRole('link', { name: 'Buzz' }),
});
