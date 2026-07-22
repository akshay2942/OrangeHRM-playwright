/**
 * Leave > Assign Leave locators.
 * @param {import('@playwright/test').Page} page
 */
export const assignLeaveLocators = (page) => ({
  heading: page.getByRole('heading', { name: 'Assign Leave' }),
  employeeNameInput: page.getByPlaceholder('Type for hints...'),
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
  assignButton: page.getByRole('button', { name: 'Assign' }),
  cancelButton: page.getByRole('button', { name: 'Cancel' }),
});
