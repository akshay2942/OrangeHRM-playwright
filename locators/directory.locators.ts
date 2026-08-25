import type { Page } from '@playwright/test';

export const directoryLocators = (page: Page) => ({
  heading: page.locator('.oxd-topbar-header-breadcrumb-module').filter({ hasText: 'Directory' }),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
  jobTitleDropdown: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Job Title' })
    .locator('.oxd-select-text')
    .first(),
  locationDropdown: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Location' })
    .locator('.oxd-select-text')
    .first(),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  cards: page.locator('.orangehrm-directory-card'),
  cardByName: (name: string) =>
    page.locator('.orangehrm-directory-card').filter({ hasText: name }),
});
