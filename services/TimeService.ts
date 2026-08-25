import type { TimePage } from '../pages/TimePage.js';

export interface TimeServiceDeps {
  timePage: TimePage;
}

/**
 * Time module workflows.
 */
export class TimeService {
  readonly timePage: TimePage;

  constructor({ timePage }: TimeServiceDeps) {
    this.timePage = timePage;
  }

  async openTimesheets() {
    await this.timePage.open();
  }

  async openAttendanceMyRecords() {
    await this.timePage.open();
    await this.timePage.openAttendance();
  }

  async isEmployeeNameInputVisible() {
    return this.timePage.locators.employeeNameInput.isVisible();
  }

  async viewEmployeeTimesheet(employeeName: string) {
    await this.timePage.viewEmployeeTimesheet(employeeName);
  }
}
