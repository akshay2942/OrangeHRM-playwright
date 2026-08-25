import type { LeavePage } from '../pages/LeavePage.js';
import type { AssignLeavePage } from '../pages/AssignLeavePage.js';

export interface LeaveServiceDeps {
  leavePage: LeavePage;
  assignLeavePage: AssignLeavePage;
}

/**
 * Leave module workflows.
 */
export class LeaveService {
  readonly leavePage: LeavePage;
  readonly assignLeavePage: AssignLeavePage;

  constructor({ leavePage, assignLeavePage }: LeaveServiceDeps) {
    this.leavePage = leavePage;
    this.assignLeavePage = assignLeavePage;
  }

  async openLeaveList() {
    await this.leavePage.openLeaveList();
  }

  async searchLeaveList() {
    await this.leavePage.searchLeave();
  }

  async openAssignLeave() {
    await this.assignLeavePage.open();
  }

  async isAssignLeaveHeadingVisible() {
    return this.assignLeavePage.locators.heading.isVisible();
  }

  async isAssignLeaveFormReady() {
    const heading = await this.assignLeavePage.locators.heading.isVisible();
    const employee = await this.assignLeavePage.locators.employeeNameInput.isVisible();
    const assign = await this.assignLeavePage.locators.assignButton.isVisible();
    return heading && employee && assign;
  }

  async openApplyLeave() {
    await this.leavePage.openApply();
  }

  async applyLeaveWithFirstAvailableType(data: {
    fromDate: string;
    toDate: string;
    comments?: string;
  }) {
    await this.leavePage.openApply();
    await this.leavePage.safeClick(this.leavePage.locators.leaveTypeDropdown);
    const option = this.leavePage.page.locator('.oxd-select-dropdown .oxd-select-option').nth(1);
    if (!(await option.isVisible().catch(() => false))) {
      return false;
    }
    await this.leavePage.safeClick(option);
    await this.leavePage.safeFill(this.leavePage.locators.fromDateInput, data.fromDate);
    await this.leavePage.safeFill(this.leavePage.locators.toDateInput, data.toDate);
    if (data.comments) {
      await this.leavePage.safeFill(this.leavePage.locators.commentsInput, data.comments);
    }
    await this.leavePage.safeClick(this.leavePage.locators.applyButton);
    return true;
  }

  async assignLeave(data: {
    employeeName: string;
    leaveType: string;
    fromDate: string;
    toDate: string;
    comments?: string;
  }) {
    await this.assignLeavePage.open();
    await this.assignLeavePage.selectAutocomplete(
      this.assignLeavePage.locators.employeeNameInput,
      data.employeeName,
    );
    await this.assignLeavePage.selectOxdOption(
      this.assignLeavePage.locators.leaveTypeDropdown,
      data.leaveType,
    );
    await this.assignLeavePage.safeFill(this.assignLeavePage.locators.fromDateInput, data.fromDate);
    await this.assignLeavePage.safeFill(this.assignLeavePage.locators.toDateInput, data.toDate);
    if (data.comments) {
      await this.assignLeavePage.safeFill(
        this.assignLeavePage.locators.commentsInput,
        data.comments,
      );
    }
    await this.assignLeavePage.safeClick(this.assignLeavePage.locators.assignButton);
  }
}
