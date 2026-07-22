/**
 * My Info page locators.
 * @param {import('@playwright/test').Page} page
 */
export const myInfoLocators = (page) => ({
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
