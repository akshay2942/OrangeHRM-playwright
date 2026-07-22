/**
 * Cross-module navigation smoke workflows.
 */
export class NavigationService {
  /**
   * @param {{
   *   adminPage: import('../pages/AdminPage.js').AdminPage,
   *   employeeListPage: import('../pages/EmployeeListPage.js').EmployeeListPage,
   *   assignLeavePage: import('../pages/AssignLeavePage.js').AssignLeavePage,
   *   timePage: import('../pages/TimePage.js').TimePage,
   *   candidateListPage: import('../pages/CandidateListPage.js').CandidateListPage,
   *   vacancyPage: import('../pages/VacancyPage.js').VacancyPage,
   *   myInfoPage: import('../pages/MyInfoPage.js').MyInfoPage,
   *   directoryPage: import('../pages/DirectoryPage.js').DirectoryPage,
   *   buzzPage: import('../pages/BuzzPage.js').BuzzPage,
   *   claimPage: import('../pages/ClaimPage.js').ClaimPage,
   *   performancePage: import('../pages/PerformancePage.js').PerformancePage,
   *   maintenancePage: import('../pages/MaintenancePage.js').MaintenancePage,
   * }} deps
   */
  constructor(deps) {
    Object.assign(this, deps);
  }

  async openAdmin() {
    await this.adminPage.open();
  }

  async openEmployeeList() {
    await this.employeeListPage.open();
  }

  async openAssignLeave() {
    await this.assignLeavePage.open();
  }

  async openTime() {
    await this.timePage.open();
  }

  async openCandidates() {
    await this.candidateListPage.open();
  }

  async openVacancies() {
    await this.vacancyPage.open();
  }

  async openMyInfo() {
    await this.myInfoPage.open();
  }

  async openDirectory() {
    await this.directoryPage.open();
  }

  async openBuzz() {
    await this.buzzPage.open();
  }

  async openClaim() {
    await this.claimPage.open();
  }

  async openPerformance() {
    await this.performancePage.open();
  }

  async openMaintenance() {
    await this.maintenancePage.open();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isAdminHeadingVisible() {
    return this.adminPage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isEmployeeListHeadingVisible() {
    return this.employeeListPage.locators.heading.isVisible();
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
  async isCandidatesHeadingVisible() {
    return this.candidateListPage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isVacanciesHeadingVisible() {
    return this.vacancyPage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isDirectoryHeadingVisible() {
    return this.directoryPage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isBuzzHeadingVisible() {
    return this.buzzPage.locators.heading.isVisible();
  }
}
