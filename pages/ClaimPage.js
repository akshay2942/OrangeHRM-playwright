import { BasePage } from './BasePage.js';
import { claimLocators } from '../locators/claim.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { EmployeeTable } from '../components/EmployeeTable.js';
import { Toast } from '../components/Toast.js';

/**
 * Claim module page actions.
 */
export class ClaimPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = claimLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.table = new EmployeeTable(page);
    this.toast = new Toast(page);
  }

  async open() {
    await this.goto(URLS.CLAIM);
    await this.waitForLoad();
  }

  async openViaMenu() {
    await this.leftMenu.openClaim();
    await this.waitForLoad();
  }

  /**
   * @param {{ event: string, currency: string, remarks?: string }} data
   */
  async createClaim(data) {
    await this.safeClick(this.locators.submitClaimTab);
    await this.safeClick(this.locators.createButton);
    await this.selectOxdOption(this.locators.eventDropdown, data.event);
    await this.selectOxdOption(this.locators.currencyDropdown, data.currency);
    if (data.remarks) {
      await this.safeFill(this.locators.remarksInput, data.remarks);
    }
    await this.safeClick(this.locators.createButton);
  }
}
