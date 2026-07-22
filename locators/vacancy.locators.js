/**
 * Recruitment > Vacancies locators.
 * @param {import('@playwright/test').Page} page
 */
export const vacancyLocators = (page) => ({
  heading: page.getByRole('heading', { name: 'Vacancies' }),
  addButton: page.getByRole('button', { name: 'Add' }),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  saveButton: page.getByRole('button', { name: 'Save' }),
  vacancyNameInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Vacancy Name' })
    .locator('input')
    .first(),
  jobTitleDropdown: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Job Title' })
    .locator('.oxd-select-text')
    .first(),
  hiringManagerInput: page.getByPlaceholder('Type for hints...').first(),
  numberOfPositionsInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Number of Positions' })
    .locator('input')
    .first(),
  descriptionInput: page.locator('textarea').first(),
  statusToggle: page.locator('.oxd-switch-input').first(),
});
