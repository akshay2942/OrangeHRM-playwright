import type { AdminPage } from '../pages/AdminPage.js';
import type { PimPage } from '../pages/PimPage.js';
import type { EmployeeListPage } from '../pages/EmployeeListPage.js';

export interface AdminServiceDeps {
  adminPage: AdminPage;
  pimPage: PimPage;
  employeeListPage: EmployeeListPage;
}

/**
 * Admin > System Users workflows.
 */
export class AdminService {
  readonly adminPage: AdminPage;
  readonly pimPage: PimPage;
  readonly employeeListPage: EmployeeListPage;

  constructor({ adminPage, pimPage, employeeListPage }: AdminServiceDeps) {
    this.adminPage = adminPage;
    this.pimPage = pimPage;
    this.employeeListPage = employeeListPage;
  }

  async openSystemUsers() {
    await this.adminPage.open();
  }

  async searchByUsername(username: string) {
    await this.adminPage.searchByUsername(username);
  }

  async isHeadingVisible() {
    return this.adminPage.locators.heading.isVisible();
  }

  async isUserTableVisible() {
    return this.adminPage.table.locators.table.first().isVisible();
  }

  async hasRecordsFoundText() {
    return this.adminPage.page.getByText(/Record(s)? Found/i).first().isVisible();
  }

  async hasUserRow(username: string) {
    return this.adminPage.table.hasRowWithText(username);
  }

  async addUser(data: {
    userRole: string;
    employeeName: string;
    username: string;
    password: string;
    status?: string;
  }) {
    await this.adminPage.clickAdd();
    await this.adminPage.fillUserForm(data);
    await this.adminPage.save();
  }

  async deleteUser(username: string) {
    await this.adminPage.deleteUser(username);
  }

  async waitForSuccessToast() {
    await this.adminPage.toast.waitForSuccess();
  }

  /** Creates an employee then a system user for that employee. */
  async createEmployeeThenUser(payload: {
    employee: {
      firstName: string;
      lastName: string;
      middleName?: string;
      employeeId?: string;
      photoPath?: string;
    };
    user: {
      userRole: string;
      status?: string;
      username: string;
      password: string;
    };
  }) {
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

  async cleanupUserAndEmployee(username: string, employeeFirstName: string) {
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
