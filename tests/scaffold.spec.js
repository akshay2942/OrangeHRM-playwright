import { test, expect } from '@playwright/test';

/**
 * Scaffold health check — replaced by real suites in later phases.
 */
test.describe('Framework scaffold @smoke', () => {
  test('env config loads base URL', async () => {
    const { envConfig } = await import('../config/env.config.js');
    expect(envConfig.baseURL).toContain('orangehrm');
    expect(envConfig.username).toBeTruthy();
  });
});
