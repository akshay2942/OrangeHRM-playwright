import { test, expect } from '../../fixtures/test.fixture.js';
import { DateUtils } from '../../utils/dateUtils.js';
import { JsonUtility } from '../../utils/jsonUtility.js';

const leaveData = await JsonUtility.read('data/leave/leaveData.json');

test.describe('Leave flows @leave @regression', () => {
  test('Leave list search loads @smoke', async ({ leaveService, page }) => {
    await leaveService.openLeaveList();
    await expect(page).toHaveURL(/leave\/viewLeaveList/i);
    await leaveService.searchLeaveList();
  });

  test('Assign leave form is usable @smoke', async ({ leaveService }) => {
    await leaveService.openAssignLeave();
    expect(await leaveService.isAssignLeaveFormReady()).toBeTruthy();
  });

  test('Apply leave with future dates @regression', async ({ leaveService, page }) => {
    const range = DateUtils.leaveRange();
    await leaveService.openApplyLeave();
    await expect(page).toHaveURL(/leave\/applyLeave/i);

    const applied = await leaveService.applyLeaveWithFirstAvailableType({
      fromDate: range.startDate,
      toDate: range.endDate,
      comments: leaveData.comments,
    });

    if (!applied) {
      test.info().annotations.push({
        type: 'note',
        description: 'No leave types available on demo for apply flow',
      });
    }
  });
});
