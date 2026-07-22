/**
 * Directory workflows.
 */
export class DirectoryService {
  /**
   * @param {{ directoryPage: import('../pages/DirectoryPage.js').DirectoryPage }} deps
   */
  constructor({ directoryPage }) {
    this.directoryPage = directoryPage;
  }

  async open() {
    await this.directoryPage.open();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isHeadingVisible() {
    return this.directoryPage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<number>}
   */
  async getCardCount() {
    return this.directoryPage.getCardCount();
  }

  /**
   * Types a name hint and searches if an autocomplete option appears.
   * @param {string} hint
   */
  async searchByNameHint(hint) {
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

  /**
   * @returns {Promise<boolean>}
   */
  async isSearchButtonVisible() {
    return this.directoryPage.locators.searchButton.isVisible();
  }
}
