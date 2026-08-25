import path from 'node:path';
import type { Page } from '@playwright/test';
import { envConfig } from '../config/env.config.js';
import { logger } from './logger.js';

/**
 * Screenshot helper utilities.
 */
export class ScreenshotUtility {
  static async capture(page: Page, name: string): Promise<string> {
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
