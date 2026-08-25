import type { Locator, Page } from '@playwright/test';
import { TIMEOUTS } from '../constants/timeouts.js';

/**
 * Wait helpers that rely on Playwright auto-waiting patterns.
 */
export class WaitUtility {
  static async networkIdle(page: Page, timeout: number = TIMEOUTS.NETWORK_IDLE): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async domContentLoaded(page: Page, timeout: number = TIMEOUTS.LONG): Promise<void> {
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  static async forVisible(locator: Locator, timeout: number = TIMEOUTS.MEDIUM): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  static async forHidden(locator: Locator, timeout: number = TIMEOUTS.MEDIUM): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }
}
