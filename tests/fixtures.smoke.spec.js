import { test, expect } from '../fixtures/test.fixture.js';
import { envConfig } from '../config/env.config.js';

test.describe('Fixtures smoke @smoke', () => {
  test('storage state opens dashboard', async ({ dashboardService, page }) => {
    await dashboardService.open();
    await expect(page).toHaveURL(/dashboard/i);
  });

  test('authenticate fixture reaches dashboard', async ({ authenticate, page }) => {
    await authenticate();
    await expect(page).toHaveURL(/dashboard/i);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('env credentials are configured', async () => {
    expect(envConfig.baseURL).toContain('orangehrm');
    expect(envConfig.username).toBeTruthy();
    expect(envConfig.password).toBeTruthy();
  });
});
