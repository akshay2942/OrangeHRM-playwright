import { test, expect } from '../../fixtures/test.fixture.js';

test.describe('Performance @performance @regression', () => {
  test('Performance module loads @smoke', async ({ performanceService, page }) => {
    await performanceService.open();
    await expect(page).toHaveURL(/performance\//i);
  });

  test('Manage reviews search controls visible @regression', async ({ performanceService }) => {
    await performanceService.open();
    expect(await performanceService.hasSearchOrResetControls()).toBeTruthy();
  });
});
