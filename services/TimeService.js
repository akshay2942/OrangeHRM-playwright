/**
 * Time module workflows.
 */
export class TimeService {
  /**
   * @param {{ timePage: import('../pages/TimePage.js').TimePage }} deps
   */
  constructor({ timePage }) {
    this.timePage = timePage;
  }

  async openTimesheets() {
    await this.timePage.open();
  }

  async openAttendanceMyRecords() {
    await this.timePage.open();
    await this.timePage.openAttendance();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isEmployeeNameInputVisible() {
    return this.timePage.locators.employeeNameInput.isVisible();
  }

  /**
   * @param {string} employeeName
   */
  async viewEmployeeTimesheet(employeeName) {
    await this.timePage.viewEmployeeTimesheet(employeeName);
  }
}
