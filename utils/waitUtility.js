import { TIMEOUTS } from '../constants/timeouts.js';

/**
 * Wait helpers that rely on Playwright auto-waiting patterns.
 */
export class WaitUtility {
  /**
   * Waits for network to become idle.
   * @param {import('@playwright/test').Page} page
   * @param {number} [timeout=TIMEOUTS.NETWORK_IDLE]
   */
  static async networkIdle(page, timeout = TIMEOUTS.NETWORK_IDLE) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Waits for DOM content to load.
   * @param {import('@playwright/test').Page} page
   * @param {number} [timeout=TIMEOUTS.LONG]
   */
  static async domContentLoaded(page, timeout = TIMEOUTS.LONG) {
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Waits until a locator is visible.
   * @param {import('@playwright/test').Locator} locator
   * @param {number} [timeout=TIMEOUTS.MEDIUM]
   */
  static async forVisible(locator, timeout = TIMEOUTS.MEDIUM) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Waits until a locator is hidden.
   * @param {import('@playwright/test').Locator} locator
   * @param {number} [timeout=TIMEOUTS.MEDIUM]
   */
  static async forHidden(locator, timeout = TIMEOUTS.MEDIUM) {
    await locator.waitFor({ state: 'hidden', timeout });
  }
}
