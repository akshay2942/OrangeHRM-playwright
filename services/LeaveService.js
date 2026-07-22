/**
 * Leave module workflows.
 */
export class LeaveService {
  /**
   * @param {{
   *   leavePage: import('../pages/LeavePage.js').LeavePage,
   *   assignLeavePage: import('../pages/AssignLeavePage.js').AssignLeavePage,
   * }} deps
   */
  constructor({ leavePage, assignLeavePage }) {
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

  /**
   * @returns {Promise<boolean>}
   */
  async isAssignLeaveHeadingVisible() {
    return this.assignLeavePage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isAssignLeaveFormReady() {
    const heading = await this.assignLeavePage.locators.heading.isVisible();
    const employee = await this.assignLeavePage.locators.employeeNameInput.isVisible();
    const assign = await this.assignLeavePage.locators.assignButton.isVisible();
    return heading && employee && assign;
  }

  async openApplyLeave() {
    await this.leavePage.openApply();
  }

  /**
   * Applies leave selecting the first available leave type option (index 1).
   * @param {{ fromDate: string, toDate: string, comments?: string }} data
   * @returns {Promise<boolean>} true when a leave type was available and apply was clicked
   */
  async applyLeaveWithFirstAvailableType(data) {
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

  /**
   * @param {{ employeeName: string, leaveType: string, fromDate: string, toDate: string, comments?: string }} data
   */
  async assignLeave(data) {
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
