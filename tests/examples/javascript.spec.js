// @ts-check
import { test, expect } from '../../fixtures/test.fixture.js';

/**
 * Example JavaScript spec — demonstrates JS + JSDoc alongside the TypeScript framework.
 * Run: npx playwright test tests/examples/javascript.spec.js
 *
 * @typedef {import('../../fixtures/test.fixture.js').TestFixtures} TestFixtures
 */

test.describe('JavaScript example @example', () => {
  test.beforeEach(async ({ dashboardService }) => {
    await dashboardService.open();
  });

  test('Verify Dashboard loads from a JS spec', async ({ page, dashboardService }) => {
    await expect(page).toHaveURL(/dashboard/i);
    expect(await dashboardService.isDashboardHeadingVisible()).toBeTruthy();
  });

  test('Verify side menu from a JS spec', async ({ dashboardService }) => {
    expect(await dashboardService.isSideMenuVisible()).toBeTruthy();
    expect(await dashboardService.isAdminMenuVisible()).toBeTruthy();
  });
});
