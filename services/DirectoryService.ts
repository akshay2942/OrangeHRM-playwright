import type { DirectoryPage } from '../pages/DirectoryPage.js';

export interface DirectoryServiceDeps {
  directoryPage: DirectoryPage;
}

/**
 * Directory workflows.
 */
export class DirectoryService {
  readonly directoryPage: DirectoryPage;

  constructor({ directoryPage }: DirectoryServiceDeps) {
    this.directoryPage = directoryPage;
  }

  async open() {
    await this.directoryPage.open();
  }

  async isHeadingVisible() {
    return this.directoryPage.locators.heading.isVisible();
  }

  async getCardCount() {
    return this.directoryPage.getCardCount();
  }

  /** Types a name hint and searches if an autocomplete option appears. */
  async searchByNameHint(hint: string) {
    await this.directoryPage.safeFill(this.directoryPage.locators.employeeNameInput, hint);
    const option = this.directoryPage.page
      .locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
      .first();
    if (await option.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.directoryPage.safeClick(option);
      await this.directoryPage.safeClick(this.directoryPage.locators.searchButton);
      await this.directoryPage.waitForLoad();
    }
  }

  async isSearchButtonVisible() {
    return this.directoryPage.locators.searchButton.isVisible();
  }
}
