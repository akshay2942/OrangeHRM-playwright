import type { PimPage } from '../pages/PimPage.js';
import type { EmployeeListPage } from '../pages/EmployeeListPage.js';

export interface PimServiceDeps {
  pimPage: PimPage;
  employeeListPage: EmployeeListPage;
}

/**
 * PIM employee workflows (add / search / delete).
 */
export class PimService {
  readonly pimPage: PimPage;
  readonly employeeListPage: EmployeeListPage;

  constructor({ pimPage, employeeListPage }: PimServiceDeps) {
    this.pimPage = pimPage;
    this.employeeListPage = employeeListPage;
  }

  async addEmployee(data: {
    firstName: string;
    lastName: string;
    middleName?: string;
    employeeId?: string;
    photoPath?: string;
  }) {
    await this.pimPage.openAddEmployee();
    await this.pimPage.fillEmployeeForm(data);
    await this.pimPage.save();
    await this.pimPage.page.waitForURL(/viewPersonalDetails|empNumber/i, { timeout: 30000 });
    await this.pimPage.waitForElement(this.pimPage.locators.personalDetailsHeading);
  }

  async openEmployeeList() {
    await this.employeeListPage.open();
  }

  async openAddEmployeeFormFromList() {
    await this.employeeListPage.open();
    await this.employeeListPage.clickAdd();
  }

  async searchByName(name: string) {
    await this.employeeListPage.searchByName(name);
  }

  async hasEmployeeRow(text: string) {
    return this.employeeListPage.table.hasRowWithText(text);
  }

  async deleteEmployee(text: string) {
    await this.employeeListPage.table.deleteRow(text);
    await this.employeeListPage.confirmDialog.waitForOpen();
    await this.employeeListPage.confirmDialog.confirm();
  }

  async waitForSuccessToast() {
    await this.employeeListPage.toast.waitForSuccess(/Success|Deleted/i);
  }

  async isPersonalDetailsVisible() {
    return this.pimPage.locators.personalDetailsHeading.isVisible();
  }

  async isEmployeeListHeadingVisible() {
    return this.employeeListPage.locators.heading.isVisible();
  }
}
