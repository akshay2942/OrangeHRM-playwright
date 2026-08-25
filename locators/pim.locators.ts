import type { Page } from '@playwright/test';

export const pimLocators = (page: Page) => ({
  heading: page.getByRole('heading', { name: 'PIM' }),
  addEmployeeHeading: page.getByRole('heading', { name: 'Add Employee' }),
  employeeListTab: page.getByRole('link', { name: 'Employee List' }),
  addEmployeeTab: page.getByRole('link', { name: 'Add Employee' }),
  addButton: page.getByRole('button', { name: 'Add' }),
  saveButton: page.getByRole('button', { name: 'Save' }),
  cancelButton: page.getByRole('button', { name: 'Cancel' }),
  firstNameInput: page.getByPlaceholder('First Name'),
  middleNameInput: page.getByPlaceholder('Middle Name'),
  lastNameInput: page.getByPlaceholder('Last Name'),
  employeeIdInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Employee Id' })
    .locator('input')
    .first(),
  photographInput: page.locator('input[type="file"]'),
  createLoginToggle: page.locator('.oxd-switch-input'),
  personalDetailsHeading: page.getByRole('heading', { name: 'Personal Details' }).first(),
});
