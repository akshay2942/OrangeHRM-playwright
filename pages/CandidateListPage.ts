import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { candidateListLocators } from '../locators/candidateList.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { EmployeeTable } from '../components/EmployeeTable.js';
import { ConfirmationDialog } from '../components/ConfirmationDialog.js';
import { Toast } from '../components/Toast.js';
import { Pagination } from '../components/Pagination.js';

/**
 * Recruitment > Candidates page actions.
 */
export class CandidateListPage extends BasePage {
  readonly locators: ReturnType<typeof candidateListLocators>;
  readonly leftMenu: LeftMenu;
  readonly table: EmployeeTable;
  readonly confirmDialog: ConfirmationDialog;
  readonly toast: Toast;
  readonly pagination: Pagination;

  constructor(page: Page) {
    super(page);
    this.locators = candidateListLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.table = new EmployeeTable(page);
    this.confirmDialog = new ConfirmationDialog(page);
    this.toast = new Toast(page);
    this.pagination = new Pagination(page);
  }

  async open() {
    await this.goto(URLS.RECRUITMENT_CANDIDATES);
    await this.waitForElement(this.locators.heading);
  }

  async clickAdd() {
    await this.safeClick(this.locators.addButton);
  }

  async fillCandidateForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    middleName?: string;
    contact?: string;
    vacancy?: string;
    keywords?: string;
    resumePath?: string;
  }) {
    await this.safeFill(this.locators.firstNameInput, data.firstName);
    if (data.middleName) {
      await this.safeFill(this.locators.middleNameInput, data.middleName);
    }
    await this.safeFill(this.locators.lastNameInput, data.lastName);
    await this.safeFill(this.locators.emailInput, data.email);
    if (data.contact) {
      await this.safeFill(this.locators.contactInput, data.contact);
    }
    if (data.vacancy) {
      await this.selectOxdOption(this.locators.vacancyDropdown, data.vacancy);
    }
    if (data.keywords) {
      await this.safeFill(this.locators.keywordsInput, data.keywords);
    }
    if (data.resumePath) {
      await this.uploadFile(this.locators.resumeInput, data.resumePath);
    }
  }

  async save() {
    await this.safeClick(this.locators.saveButton);
  }

  async searchByName(name: string) {
    await this.safeFill(this.locators.candidateNameSearch, name);
    const option = this.page
      .locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option')
      .filter({ hasText: name })
      .first();
    if (await option.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.safeClick(option);
    }
    await this.safeClick(this.locators.searchButton);
    await this.waitForLoad();
  }

  async deleteCandidate(text: string) {
    await this.table.deleteRow(text);
    await this.confirmDialog.waitForOpen();
    await this.confirmDialog.confirm();
  }
}
