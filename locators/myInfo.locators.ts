import type { Page } from '@playwright/test';

export const myInfoLocators = (page: Page) => ({
  heading: page.getByRole('heading', { name: 'PIM' }),
  personalDetails: page.getByRole('link', { name: 'Personal Details' }),
  contactDetails: page.getByRole('link', { name: 'Contact Details' }),
  emergencyContacts: page.getByRole('link', { name: 'Emergency Contacts' }),
  dependents: page.getByRole('link', { name: 'Dependents' }),
  firstNameInput: page.getByPlaceholder('First Name'),
  middleNameInput: page.getByPlaceholder('Middle Name'),
  lastNameInput: page.getByPlaceholder('Last Name'),
  saveButton: page.getByRole('button', { name: 'Save' }).first(),
  employeeImage: page.locator('.employee-image, .orangehrm-edit-employee-image img').first(),
});
