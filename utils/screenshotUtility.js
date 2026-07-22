import path from 'node:path';
import { envConfig } from '../config/env.config.js';
import { logger } from './logger.js';

/**
 * Screenshot helper utilities.
 */
export class ScreenshotUtility {
  /**
   * Captures a full-page screenshot under screenshots/.
   * @param {import('@playwright/test').Page} page
   * @param {string} name
   * @returns {Promise<string>} Absolute path of saved screenshot
   */
  static async capture(page, name) {
    const safeName = name.replace(/[^a-z0-9-_]/gi, '_');
    const filePath = path.join(
      envConfig.rootDir,
      'screenshots',
      `${safeName}_${Date.now()}.png`,
    );
    await page.screenshot({ path: filePath, fullPage: true });
    logger.info(`Screenshot saved: ${filePath}`);
    return filePath;
  }
}
