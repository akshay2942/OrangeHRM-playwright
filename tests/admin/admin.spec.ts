import { test, expect } from '../../fixtures/test.fixture.js';
import { RandomDataGenerator } from '../../utils/randomData.js';
import { JsonUtility } from '../../utils/jsonUtility.js';

const adminData = await JsonUtility.read<{
  searchExistingUser: { username: string };
  newUserDefaults: { userRole: string; status: string };
}>('data/admin/adminData.json');

test.describe('Admin user management @admin @regression', () => {
  test('Search existing system user @smoke', async ({ adminService }) => {
    await adminService.openSystemUsers();
    await adminService.searchByUsername(adminData.searchExistingUser.username);
    expect(await adminService.hasRecordsFoundText()).toBeTruthy();
    expect(await adminService.isUserTableVisible()).toBeTruthy();
  });

  test('Add and delete system user @regression', async ({ adminService }) => {
    const employee = RandomDataGenerator.employee();
    const username = RandomDataGenerator.username();
    const password = RandomDataGenerator.password();

    await adminService.createEmployeeThenUser({
      employee,
      user: {
        userRole: adminData.newUserDefaults.userRole,
        status: adminData.newUserDefaults.status,
        username,
        password,
      },
    });

    await adminService.waitForSuccessToast();
    await adminService.searchByUsername(username);
    expect(await adminService.hasUserRow(username)).toBeTruthy();

    await adminService.deleteUser(username);
    await adminService.waitForSuccessToast();
    await adminService.cleanupUserAndEmployee(username, employee.firstName);
  });
});
