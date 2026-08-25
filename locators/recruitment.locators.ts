import type { Page } from '@playwright/test';

export const recruitmentLocators = (page: Page) => ({
  heading: page.getByRole('heading', { name: 'Recruitment' }),
  candidatesTab: page.getByRole('link', { name: 'Candidates' }),
  vacanciesTab: page.getByRole('link', { name: 'Vacancies' }),
  addButton: page.getByRole('button', { name: 'Add' }),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  saveButton: page.getByRole('button', { name: 'Save' }),
});
