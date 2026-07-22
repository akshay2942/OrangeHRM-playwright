/**
 * Time module locators.
 * @param {import('@playwright/test').Page} page
 */
export const timeLocators = (page) => ({
  heading: page.getByRole('heading', { name: /Time|Timesheets/i }),
  timesheetsTab: page.locator('.oxd-topbar-body .oxd-topbar-body-nav-tab').filter({ hasText: 'Timesheets' }),
  attendanceTab: page.locator('.oxd-topbar-body .oxd-topbar-body-nav-tab').filter({ hasText: 'Attendance' }),
  reportsTab: page.locator('.oxd-topbar-body .oxd-topbar-body-nav-tab').filter({ hasText: 'Reports' }),
  projectInfoTab: page.locator('.oxd-topbar-body .oxd-topbar-body-nav-tab').filter({ hasText: 'Project Info' }),
  attendanceMyRecords: page.getByRole('menuitem', { name: 'My Records' }),
  attendancePunch: page.getByRole('menuitem', { name: 'Punch In/Out' }),
  attendanceEmployeeRecords: page.getByRole('menuitem', { name: 'Employee Records' }),
  employeeNameInput: page.getByPlaceholder('Type for hints...').first(),
  viewButton: page.getByRole('button', { name: 'View' }),
  punchInButton: page.getByRole('button', { name: /In|Punch In/i }),
  punchOutButton: page.getByRole('button', { name: /Out|Punch Out/i }),
  customerNameInput: page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Name' })
    .locator('input')
    .first(),
  saveButton: page.getByRole('button', { name: 'Save' }),
  addButton: page.getByRole('button', { name: 'Add' }),
});
