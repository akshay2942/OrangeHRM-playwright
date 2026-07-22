/**
 * Recruitment module shared locators.
 * @param {import('@playwright/test').Page} page
 */
export const recruitmentLocators = (page) => ({
  heading: page.getByRole('heading', { name: 'Recruitment' }),
  candidatesTab: page.getByRole('link', { name: 'Candidates' }),
  vacanciesTab: page.getByRole('link', { name: 'Vacancies' }),
  addButton: page.getByRole('button', { name: 'Add' }),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  saveButton: page.getByRole('button', { name: 'Save' }),
});
