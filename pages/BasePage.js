import { expect } from '@playwright/test';
import path from 'node:path';
import { TIMEOUTS } from '../constants/timeouts.js';
import { RetryUtility } from '../utils/retryUtility.js';
import { ScreenshotUtility } from '../utils/screenshotUtility.js';
import { logger } from '../utils/logger.js';

/**
 * Base page object with reusable Playwright interaction helpers.
 * All page objects must extend this class.
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {import('@playwright/test').LocatorClickOptions} [options]
   */
  async click(locator, options = {}) {
    await locator.click(options);
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string} value
   * @param {import('@playwright/test').LocatorFillOptions} [options]
   */
  async fill(locator, value, options = {}) {
    await locator.fill(value, options);
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   */
  async clear(locator) {
    await locator.clear();
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {{ state?: 'attached'|'detached'|'visible'|'hidden', timeout?: number }} [options]
   */
  async waitForElement(locator, options = {}) {
    await locator.waitFor({
      state: options.state || 'visible',
      timeout: options.timeout || TIMEOUTS.MEDIUM,
    });
  }

  /**
   * @param {'load'|'domcontentloaded'|'networkidle'} [state='domcontentloaded']
   * @param {number} [timeout=TIMEOUTS.LONG]
   */
  async waitForLoad(state = 'domcontentloaded', timeout = TIMEOUTS.LONG) {
    await this.page.waitForLoadState(state, { timeout });
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   */
  async verifyVisible(locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   */
  async verifyHidden(locator) {
    await expect(locator).toBeHidden();
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string|RegExp} text
   */
  async verifyText(locator, text) {
    await expect(locator).toContainText(text);
  }

  /**
   * @param {string|RegExp} title
   */
  async verifyTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  /**
   * @param {string|RegExp} url
   */
  async verifyURL(url) {
    await expect(this.page).toHaveURL(url);
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   */
  async hover(locator) {
    await locator.hover();
  }

  /**
   * @param {import('@playwright/test').Locator} source
   * @param {import('@playwright/test').Locator} target
   */
  async dragDrop(source, target) {
    await source.dragTo(target);
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   */
  async doubleClick(locator) {
    await locator.dblclick();
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string} filePath
   */
  async uploadFile(locator, filePath) {
    await locator.setInputFiles(path.resolve(filePath));
  }

  /**
   * Triggers a download via click and saves it.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} savePath
   * @returns {Promise<string>}
   */
  async downloadFile(locator, savePath) {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      locator.click(),
    ]);
    const target = path.resolve(savePath);
    await download.saveAs(target);
    return target;
  }

  /**
   * @param {string} name
   * @returns {Promise<string>}
   */
  async takeScreenshot(name) {
    return ScreenshotUtility.capture(this.page, name);
  }

  /**
   * @param {import('@playwright/test').Locator} [locator]
   */
  async scroll(locator) {
    if (locator) {
      await locator.scrollIntoViewIfNeeded();
      return;
    }
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string} value Label or value to select
   */
  async selectDropdown(locator, value) {
    await locator.selectOption({ label: value }).catch(async () => {
      await locator.selectOption({ value });
    });
  }

  /**
   * Selects an option from an OrangeHRM oxd custom dropdown.
   * @param {import('@playwright/test').Locator} dropdown
   * @param {string|RegExp} optionText
   */
  async selectOxdOption(dropdown, optionText) {
    await this.safeClick(dropdown);
    const option = this.page
      .locator('.oxd-select-dropdown .oxd-select-option')
      .filter({ hasText: optionText })
      .first();
    await this.safeClick(option);
  }

  /**
   * Types into an autocomplete and picks a matching suggestion.
   * @param {import('@playwright/test').Locator} input
   * @param {string} text
   * @param {string|RegExp} [optionText]
   */
  async selectAutocomplete(input, text, optionText = text) {
    await this.safeFill(input, text);
    const option = this.page
      .locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
      .filter({ hasText: optionText })
      .first();
    await this.waitForElement(option);
    await this.safeClick(option);
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {number} [retries=3]
   */
  async retryClick(locator, retries = 3) {
    await RetryUtility.retry(() => locator.click(), {
      retries,
      label: 'retryClick',
    });
  }

  /**
   * Clicks only when the element is visible and enabled.
   * @param {import('@playwright/test').Locator} locator
   */
  async safeClick(locator) {
    await this.waitForElement(locator, { state: 'visible' });
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  /**
   * Clears and fills only when the element is editable.
   * @param {import('@playwright/test').Locator} locator
   * @param {string} value
   */
  async safeFill(locator, value) {
    await this.waitForElement(locator, { state: 'visible' });
    await expect(locator).toBeEditable();
    await locator.fill(value);
  }

  /**
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async getText(locator) {
    return (await locator.innerText()).trim();
  }

  /**
   * @param {number} [timeout=TIMEOUTS.NETWORK_IDLE]
   */
  async networkIdle(timeout = TIMEOUTS.NETWORK_IDLE) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Accepts the next browser dialog.
   */
  async acceptAlert() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  /**
   * Dismisses the next browser dialog.
   */
  async dismissAlert() {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }

  async refresh() {
    await this.page.reload();
    await this.waitForLoad();
  }

  async back() {
    await this.page.goBack();
    await this.waitForLoad();
  }

  async forward() {
    await this.page.goForward();
    await this.waitForLoad();
  }

  /**
   * @param {string} url
   */
  async goto(url) {
    logger.info(`Navigate to ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
