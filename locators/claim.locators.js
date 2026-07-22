/**
 * Claim module locators.
 * @param {import('@playwright/test').Page} page
 */
export const claimLocators = (page) => ({
  heading: page.getByRole('heading', { name: /Claim/i }),
  submitClaimTab: page.getByRole('link', { name: 'Submit Claim' }),
  myClaimsTab: page.getByRole('link', { name: 'My Claims' }),
  employeeClaimsTab: page.getByRole('link', { name: 'Employee Claims' }),
  assignClaimTab: page.getByRole('link', { name: 'Assign Claim' }),
  createButton: page.getByRole('button', { name: 'Create' }),
  submitButton: page.getByRole('button', { name: 'Submit' }),
  searchButton: page.getByRole('button', { name: 'Search' }),
  eventDropdown: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Event' })
    .locator('.oxd-select-text')
    .first(),
  currencyDropdown: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Currency' })
    .locator('.oxd-select-text')
    .first(),
  remarksInput: page.locator('textarea').first(),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
});
