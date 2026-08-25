import type { Page } from '@playwright/test';

export const performanceLocators = (page: Page) => ({
  heading: page.getByRole('heading', { name: /Performance|Manage Reviews|Employee Reviews/i }),
  configureTab: page.getByRole('link', { name: 'Configure' }),
  manageReviewsTab: page.getByRole('link', { name: 'Manage Reviews' }),
  myTrackersTab: page.getByRole('link', { name: 'My Trackers' }),
  employeeTrackersTab: page.getByRole('link', { name: 'Employee Trackers' }),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
  searchButton: page.getByRole('button', { name: 'Search' }),
  resetButton: page.getByRole('button', { name: 'Reset' }),
  addButton: page.getByRole('button', { name: 'Add' }),
});
