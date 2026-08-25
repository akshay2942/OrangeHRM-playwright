import { test, expect } from '../../fixtures/test.fixture.js';
import { RandomDataGenerator } from '../../utils/randomData.js';

test.describe('PIM employee CRUD @pim @regression', () => {
  test('Add, search, and delete employee @smoke', async ({ pimService }) => {
    test.setTimeout(90000);
    const employee = {
      firstName: RandomDataGenerator.firstName(),
      lastName: RandomDataGenerator.lastName(),
    };

    await pimService.addEmployee(employee);
    expect(await pimService.isPersonalDetailsVisible()).toBeTruthy();

    await pimService.openEmployeeList();
    await pimService.searchByName(employee.firstName);
    expect(await pimService.hasEmployeeRow(employee.firstName)).toBeTruthy();

    await pimService.deleteEmployee(employee.firstName);
    await pimService.waitForSuccessToast();
  });

  test('Open add employee form via list @smoke', async ({ pimService, page }) => {
    await pimService.openAddEmployeeFormFromList();
    await expect(page).toHaveURL(/pim\/addEmployee/i);
  });
});
