import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { vacancyLocators } from '../locators/vacancy.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';
import { EmployeeTable } from '../components/EmployeeTable.js';
import { ConfirmationDialog } from '../components/ConfirmationDialog.js';
import { Toast } from '../components/Toast.js';

/**
 * Recruitment > Vacancies page actions.
 */
export class VacancyPage extends BasePage {
  readonly locators: ReturnType<typeof vacancyLocators>;
  readonly leftMenu: LeftMenu;
  readonly table: EmployeeTable;
  readonly confirmDialog: ConfirmationDialog;
  readonly toast: Toast;

  constructor(page: Page) {
    super(page);
    this.locators = vacancyLocators(page);
    this.leftMenu = new LeftMenu(page);
    this.table = new EmployeeTable(page);
    this.confirmDialog = new ConfirmationDialog(page);
    this.toast = new Toast(page);
  }

  async open() {
    await this.goto(URLS.RECRUITMENT_VACANCIES);
    await this.waitForElement(this.locators.heading);
  }

  async clickAdd() {
    await this.safeClick(this.locators.addButton);
  }

  async fillVacancyForm(data: {
    vacancyName: string;
    jobTitle: string;
    hiringManager: string;
    numberOfPositions?: string;
    description?: string;
  }) {
    await this.safeFill(this.locators.vacancyNameInput, data.vacancyName);
    await this.selectOxdOption(this.locators.jobTitleDropdown, data.jobTitle);
    await this.selectAutocomplete(this.locators.hiringManagerInput, data.hiringManager);
    if (data.numberOfPositions) {
      await this.safeFill(this.locators.numberOfPositionsInput, data.numberOfPositions);
    }
    if (data.description) {
      await this.safeFill(this.locators.descriptionInput, data.description);
    }
  }

  async save() {
    await this.safeClick(this.locators.saveButton);
  }

  async deleteVacancy(name: string) {
    await this.table.deleteRow(name);
    await this.confirmDialog.waitForOpen();
    await this.confirmDialog.confirm();
  }
}
