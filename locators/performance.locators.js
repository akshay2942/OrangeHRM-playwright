/**
 * Performance module locators.
 * @param {import('@playwright/test').Page} page
 */
export const performanceLocators = (page) => ({
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
