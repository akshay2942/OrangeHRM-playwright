/**
 * Admin > System Users locators.
 * @param {import('@playwright/test').Page} page
 */
export const adminLocators = (page) => ({
  heading: page.getByRole('heading', { name: 'System Users' }),
  addButton: page.getByRole('button', { name: 'Add' }),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  saveButton: page.getByRole('button', { name: 'Save' }),
  cancelButton: page.getByRole('button', { name: 'Cancel' }),
  usernameSearch: page
    .locator('.oxd-form .oxd-input-group')
    .filter({ hasText: 'Username' })
    .locator('input')
    .first(),
  userRoleDropdown: page
    .locator('.oxd-form .oxd-input-group')
    .filter({ hasText: 'User Role' })
    .locator('.oxd-select-text')
    .first(),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
  statusDropdown: page
    .locator('.oxd-form .oxd-input-group')
    .filter({ hasText: 'Status' })
    .locator('.oxd-select-text')
    .first(),
  usernameInput: page
    .locator('.oxd-form .oxd-input-group')
    .filter({ hasText: /^Username/ })
    .locator('input')
    .first(),
  passwordInput: page
    .locator('.oxd-form .oxd-input-group')
    .filter({ hasText: /^Password/ })
    .locator('input[type="password"]')
    .first(),
  confirmPasswordInput: page
    .locator('.oxd-form .oxd-input-group')
    .filter({ hasText: 'Confirm Password' })
    .locator('input[type="password"]')
    .first(),
  recordsFound: page.getByText(/Records Found|Record Found/i),
});
