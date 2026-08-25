import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { directoryLocators } from '../locators/directory.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';

/**
 * Directory page actions.
 */
export class DirectoryPage extends BasePage {
  readonly locators: ReturnType<typeof directoryLocators>;
  readonly leftMenu: LeftMenu;

  constructor(page: Page) {
    super(page);
    this.locators = directoryLocators(page);
    this.leftMenu = new LeftMenu(page);
  }

  async open() {
    await this.goto(URLS.DIRECTORY);
    await this.waitForElement(this.locators.heading);
  }

  async openViaMenu() {
    await this.leftMenu.openDirectory();
    await this.waitForElement(this.locators.heading);
  }

  async searchByName(name: string) {
    await this.selectAutocomplete(this.locators.employeeNameInput, name);
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  async searchByJobTitle(jobTitle: string) {
    await this.selectOxdOption(this.locators.jobTitleDropdown, jobTitle);
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  async resetSearch() {
    await this.safeClick(this.locators.resetButton);
  }

  async getCardCount() {
    return this.locators.cards.count();
  }
}
