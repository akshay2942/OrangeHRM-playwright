import { test, expect } from '../../fixtures/test.fixture.js';

test.describe('Dashboard scenarios @smoke @regression', () => {
  test.beforeEach(async ({ dashboardService }) => {
    await dashboardService.open();
  });

  test('Verify Dashboard loads @smoke', async ({ page, dashboardService }) => {
    await expect(page).toHaveURL(/dashboard/i);
    expect(await dashboardService.isDashboardHeadingVisible()).toBeTruthy();
  });

  test('Verify user profile @smoke', async ({ dashboardService }) => {
    const profileName = await dashboardService.getProfileName();
    expect(profileName.length).toBeGreaterThan(0);
    expect(await dashboardService.isUserDropdownVisible()).toBeTruthy();
  });

  test('Verify side menu @smoke', async ({ dashboardService }) => {
    expect(await dashboardService.isSideMenuVisible()).toBeTruthy();
    expect(await dashboardService.isAdminMenuVisible()).toBeTruthy();
    expect(await dashboardService.isPimMenuVisible()).toBeTruthy();
    expect(await dashboardService.isLeaveMenuVisible()).toBeTruthy();
  });

  test('Verify quick launch', async ({ dashboardService }) => {
    expect(await dashboardService.isQuickLaunchVisible()).toBeTruthy();
    const count = await dashboardService.getQuickLaunchCount();
    expect(count).toBeGreaterThan(0);
  });
});
