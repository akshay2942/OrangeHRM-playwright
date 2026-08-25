import type { Page } from '@playwright/test';

export const candidateListLocators = (page: Page) => ({
  heading: page.getByRole('heading', { name: 'Candidates' }),
  addButton: page.getByRole('button', { name: 'Add' }),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  saveButton: page.getByRole('button', { name: 'Save' }),
  firstNameInput: page.getByPlaceholder('First Name'),
  middleNameInput: page.getByPlaceholder('Middle Name'),
  lastNameInput: page.getByPlaceholder('Last Name'),
  emailInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Email' })
    .locator('input')
    .first(),
  contactInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Contact Number' })
    .locator('input')
    .first(),
  vacancyDropdown: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Vacancy' })
    .locator('.oxd-select-text')
    .first(),
  keywordsInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Keywords' })
    .locator('input')
    .first(),
  resumeInput: page.locator('input[type="file"]'),
  candidateNameSearch: page.getByPlaceholder('Type for hints...').first(),
});
