/**
 * Leave module locators (list / apply).
 * @param {import('@playwright/test').Page} page
 */
export const leaveLocators = (page) => ({
  heading: page.getByRole('heading', { name: /Leave/i }),
  applyTab: page.getByRole('link', { name: 'Apply' }),
  myLeaveTab: page.getByRole('link', { name: 'My Leave' }),
  entitlementsTab: page.getByRole('link', { name: 'Entitlements' }),
  leaveListTab: page.getByRole('link', { name: 'Leave List' }),
  assignLeaveTab: page.getByRole('link', { name: 'Assign Leave' }),
  leaveTypeDropdown: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Leave Type' })
    .locator('.oxd-select-text')
    .first(),
  fromDateInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'From Date' })
    .locator('input')
    .first(),
  toDateInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'To Date' })
    .locator('input')
    .first(),
  commentsInput: page.locator('textarea').first(),
  applyButton: page.getByRole('button', { name: 'Apply' }),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
});
