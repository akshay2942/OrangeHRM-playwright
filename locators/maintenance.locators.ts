import type { Page } from '@playwright/test';

export const maintenanceLocators = (page: Page) => ({
  heading: page.getByRole('heading', { name: /Maintenance|Purge Employee|Access Records/i }),
  purgeRecordsTab: page.getByRole('link', { name: 'Purge Records' }),
  accessRecordsTab: page.getByRole('link', { name: 'Access Records' }),
  passwordInput: page.getByPlaceholder('Password'),
  confirmButton: page.getByRole('button', { name: 'Confirm' }),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
  searchButton: page.getByRole('button', { name: 'Search' }),
});
