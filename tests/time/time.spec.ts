import { test, expect } from '../../fixtures/test.fixture.js';

test.describe('Time module @time @regression', () => {
  test('Employee timesheets view loads @smoke', async ({ timeService, page }) => {
    await timeService.openTimesheets();
    await expect(page).toHaveURL(/time\//i);
    expect(await timeService.isEmployeeNameInputVisible()).toBeTruthy();
  });

  test('Attendance My Records opens @smoke', async ({ timeService, page }) => {
    await timeService.openAttendanceMyRecords();
    await expect(page).toHaveURL(/attendance|viewMyAttendance|time/i);
  });
});
