/**
 * PIM employee workflows (add / search / delete).
 */
export class PimService {
  /**
   * @param {{
   *   pimPage: import('../pages/PimPage.js').PimPage,
   *   employeeListPage: import('../pages/EmployeeListPage.js').EmployeeListPage,
   * }} deps
   */
  constructor({ pimPage, employeeListPage }) {
    this.pimPage = pimPage;
    this.employeeListPage = employeeListPage;
  }

  /**
   * @param {{ firstName: string, middleName?: string, lastName: string, employeeId?: string, photoPath?: string }} data
   */
  async addEmployee(data) {
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

  /**
   * @param {string} name
   */
  async searchByName(name) {
    await this.employeeListPage.searchByName(name);
  }

  /**
   * @param {string} text
   * @returns {Promise<boolean>}
   */
  async hasEmployeeRow(text) {
    return this.employeeListPage.table.hasRowWithText(text);
  }

  /**
   * @param {string} text
   */
  async deleteEmployee(text) {
    await this.employeeListPage.table.deleteRow(text);
    await this.employeeListPage.confirmDialog.waitForOpen();
    await this.employeeListPage.confirmDialog.confirm();
  }

  async waitForSuccessToast() {
    await this.employeeListPage.toast.waitForSuccess(/Success|Deleted/i);
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isPersonalDetailsVisible() {
    return this.pimPage.locators.personalDetailsHeading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isEmployeeListHeadingVisible() {
    return this.employeeListPage.locators.heading.isVisible();
  }
}
