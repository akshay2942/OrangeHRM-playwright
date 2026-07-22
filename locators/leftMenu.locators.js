/**
 * Left side navigation menu locators.
 * @param {import('@playwright/test').Page} page
 */
export const leftMenuLocators = (page) => ({
  sideMenu: page.getByRole('navigation', { name: 'Sidepanel' }),
  searchInput: page.getByPlaceholder('Search'),
  menuItem: (name) => page.getByRole('link', { name }),
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
