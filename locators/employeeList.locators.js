/**
 * PIM > Employee List locators.
 * @param {import('@playwright/test').Page} page
 */
export const employeeListLocators = (page) => ({
  heading: page.getByRole('heading', { name: 'Employee Information' }),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
  employeeIdInput: page
    .locator('.oxd-form .oxd-input-group')
    .filter({ hasText: 'Employee Id' })
    .locator('input')
    .first(),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  addButton: page.getByRole('button', { name: 'Add' }),
  recordsFound: page.getByText(/Records Found|Record Found|No Records Found/i),
});
