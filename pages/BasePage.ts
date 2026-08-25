import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';
import path from 'node:path';
import { TIMEOUTS } from '../constants/timeouts.js';
import { RetryUtility } from '../utils/retryUtility.js';
import { ScreenshotUtility } from '../utils/screenshotUtility.js';
import { logger } from '../utils/logger.js';

type ClickOptions = Parameters<Locator['click']>[0];
type FillOptions = Parameters<Locator['fill']>[1];

/**
 * Base page object with reusable Playwright interaction helpers.
 * All page objects must extend this class.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: Locator, options: ClickOptions = {}): Promise<void> {
    await locator.click(options);
  }

  async fill(locator: Locator, value: string, options: FillOptions = {}): Promise<void> {
    await locator.fill(value, options);
  }

  async clear(locator: Locator): Promise<void> {
    await locator.clear();
  }

  async waitForElement(
    locator: Locator,
    options: { state?: 'attached' | 'detached' | 'visible' | 'hidden'; timeout?: number } = {},
  ): Promise<void> {
    await locator.waitFor({
      state: options.state || 'visible',
      timeout: options.timeout || TIMEOUTS.MEDIUM,
    });
  }

  async waitForLoad(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded',
    timeout: number = TIMEOUTS.LONG,
  ): Promise<void> {
    await this.page.waitForLoadState(state, { timeout });
  }

  async verifyVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async verifyHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  async verifyText(locator: Locator, text: string | RegExp): Promise<void> {
    await expect(locator).toContainText(text);
  }

  async verifyTitle(title: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async verifyURL(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  async dragDrop(source: Locator, target: Locator): Promise<void> {
    await source.dragTo(target);
  }

  async doubleClick(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  async uploadFile(locator: Locator, filePath: string): Promise<void> {
    await locator.setInputFiles(path.resolve(filePath));
  }

  async downloadFile(locator: Locator, savePath: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      locator.click(),
    ]);
    const target = path.resolve(savePath);
    await download.saveAs(target);
    return target;
  }

  async takeScreenshot(name: string): Promise<string> {
    return ScreenshotUtility.capture(this.page, name);
  }

  async scroll(locator?: Locator): Promise<void> {
    if (locator) {
      await locator.scrollIntoViewIfNeeded();
      return;
    }
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async selectDropdown(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ label: value }).catch(async () => {
      await locator.selectOption({ value });
    });
  }

  async selectOxdOption(dropdown: Locator, optionText: string | RegExp): Promise<void> {
    await this.safeClick(dropdown);
    const option = this.page
      .locator('.oxd-select-dropdown .oxd-select-option')
      .filter({ hasText: optionText })
      .first();
    await this.safeClick(option);
  }

  async selectAutocomplete(
    input: Locator,
    text: string,
    optionText: string | RegExp = text,
  ): Promise<void> {
    await this.safeFill(input, text);
    const option = this.page
      .locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
      .filter({ hasText: optionText })
      .first();
    await this.waitForElement(option);
    await this.safeClick(option);
  }

  async retryClick(locator: Locator, retries = 3): Promise<void> {
    await RetryUtility.retry(() => locator.click(), {
      retries,
      label: 'retryClick',
    });
  }

  async safeClick(locator: Locator): Promise<void> {
    await this.waitForElement(locator, { state: 'visible' });
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  async safeFill(locator: Locator, value: string): Promise<void> {
    await this.waitForElement(locator, { state: 'visible' });
    await expect(locator).toBeEditable();
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.innerText()).trim();
  }

  async networkIdle(timeout: number = TIMEOUTS.NETWORK_IDLE): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async acceptAlert(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  async dismissAlert(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }

  async refresh(): Promise<void> {
    await this.page.reload();
    await this.waitForLoad();
  }

  async back(): Promise<void> {
    await this.page.goBack();
    await this.waitForLoad();
  }

  async forward(): Promise<void> {
    await this.page.goForward();
    await this.waitForLoad();
  }

  async goto(url: string): Promise<void> {
    logger.info(`Navigate to ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
