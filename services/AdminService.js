/**
 * Admin > System Users workflows.
 */
export class AdminService {
  /**
   * @param {{
   *   adminPage: import('../pages/AdminPage.js').AdminPage,
   *   pimPage: import('../pages/PimPage.js').PimPage,
   *   employeeListPage: import('../pages/EmployeeListPage.js').EmployeeListPage,
   * }} deps
   */
  constructor({ adminPage, pimPage, employeeListPage }) {
    this.adminPage = adminPage;
    this.pimPage = pimPage;
    this.employeeListPage = employeeListPage;
  }

  async openSystemUsers() {
    await this.adminPage.open();
  }

  /**
   * @param {string} username
   */
  async searchByUsername(username) {
    await this.adminPage.searchByUsername(username);
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isHeadingVisible() {
    return this.adminPage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isUserTableVisible() {
    return this.adminPage.table.locators.table.first().isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async hasRecordsFoundText() {
    return this.adminPage.page.getByText(/Record(s)? Found/i).first().isVisible();
  }

  /**
   * @param {string} username
   * @returns {Promise<boolean>}
   */
  async hasUserRow(username) {
    return this.adminPage.table.hasRowWithText(username);
  }

  /**
   * @param {{ userRole: string, employeeName: string, status?: string, username: string, password: string }} data
   */
  async addUser(data) {
    await this.adminPage.clickAdd();
    await this.adminPage.fillUserForm(data);
    await this.adminPage.save();
  }

  /**
   * @param {string} username
   */
  async deleteUser(username) {
    await this.adminPage.deleteUser(username);
  }

  async waitForSuccessToast() {
    await this.adminPage.toast.waitForSuccess();
  }

  /**
   * Creates an employee then a system user for that employee.
   * @param {{
   *   employee: { firstName: string, lastName: string, middleName?: string, employeeId?: string },
   *   user: { userRole: string, status?: string, username: string, password: string },
   * }} payload
   */
  async createEmployeeThenUser(payload) {
    await this.pimPage.openAddEmployee();
    await this.pimPage.fillEmployeeForm(payload.employee);
    await this.pimPage.save();
    await this.pimPage.page.waitForURL(/viewPersonalDetails|empNumber/i, { timeout: 30000 });
    await this.pimPage.waitForElement(this.pimPage.locators.personalDetailsHeading);

    await this.adminPage.open();
    await this.addUser({
      userRole: payload.user.userRole,
      employeeName: payload.employee.firstName,
      status: payload.user.status,
      username: payload.user.username,
      password: payload.user.password,
    });
  }

  /**
   * @param {string} username
   * @param {string} employeeFirstName
   */
  async cleanupUserAndEmployee(username, employeeFirstName) {
    await this.adminPage.open();
    await this.adminPage.searchByUsername(username);
    if (await this.adminPage.table.hasRowWithText(username)) {
      await this.adminPage.deleteUser(username);
      await this.adminPage.toast.waitForSuccess().catch(() => {});
    }

    await this.employeeListPage.open();
    await this.employeeListPage.searchByName(employeeFirstName);
    if (await this.employeeListPage.table.hasRowWithText(employeeFirstName)) {
      await this.employeeListPage.deleteEmployee(employeeFirstName);
      await this.employeeListPage.toast.waitForSuccess().catch(() => {});
    }
  }
}
