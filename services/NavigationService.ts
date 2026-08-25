import type { AdminPage } from '../pages/AdminPage.js';
import type { EmployeeListPage } from '../pages/EmployeeListPage.js';
import type { AssignLeavePage } from '../pages/AssignLeavePage.js';
import type { TimePage } from '../pages/TimePage.js';
import type { CandidateListPage } from '../pages/CandidateListPage.js';
import type { VacancyPage } from '../pages/VacancyPage.js';
import type { MyInfoPage } from '../pages/MyInfoPage.js';
import type { DirectoryPage } from '../pages/DirectoryPage.js';
import type { BuzzPage } from '../pages/BuzzPage.js';
import type { ClaimPage } from '../pages/ClaimPage.js';
import type { PerformancePage } from '../pages/PerformancePage.js';
import type { MaintenancePage } from '../pages/MaintenancePage.js';

export interface NavigationServiceDeps {
  adminPage: AdminPage;
  employeeListPage: EmployeeListPage;
  assignLeavePage: AssignLeavePage;
  timePage: TimePage;
  candidateListPage: CandidateListPage;
  vacancyPage: VacancyPage;
  myInfoPage: MyInfoPage;
  directoryPage: DirectoryPage;
  buzzPage: BuzzPage;
  claimPage: ClaimPage;
  performancePage: PerformancePage;
  maintenancePage: MaintenancePage;
}

/**
 * Cross-module navigation smoke workflows.
 */
export class NavigationService implements NavigationServiceDeps {
  readonly adminPage: AdminPage;
  readonly employeeListPage: EmployeeListPage;
  readonly assignLeavePage: AssignLeavePage;
  readonly timePage: TimePage;
  readonly candidateListPage: CandidateListPage;
  readonly vacancyPage: VacancyPage;
  readonly myInfoPage: MyInfoPage;
  readonly directoryPage: DirectoryPage;
  readonly buzzPage: BuzzPage;
  readonly claimPage: ClaimPage;
  readonly performancePage: PerformancePage;
  readonly maintenancePage: MaintenancePage;

  constructor(deps: NavigationServiceDeps) {
    this.adminPage = deps.adminPage;
    this.employeeListPage = deps.employeeListPage;
    this.assignLeavePage = deps.assignLeavePage;
    this.timePage = deps.timePage;
    this.candidateListPage = deps.candidateListPage;
    this.vacancyPage = deps.vacancyPage;
    this.myInfoPage = deps.myInfoPage;
    this.directoryPage = deps.directoryPage;
    this.buzzPage = deps.buzzPage;
    this.claimPage = deps.claimPage;
    this.performancePage = deps.performancePage;
    this.maintenancePage = deps.maintenancePage;
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

  async isAdminHeadingVisible() {
    return this.adminPage.locators.heading.isVisible();
  }

  async isEmployeeListHeadingVisible() {
    return this.employeeListPage.locators.heading.isVisible();
  }

  async isAssignLeaveHeadingVisible() {
    return this.assignLeavePage.locators.heading.isVisible();
  }

  async isCandidatesHeadingVisible() {
    return this.candidateListPage.locators.heading.isVisible();
  }

  async isVacanciesHeadingVisible() {
    return this.vacancyPage.locators.heading.isVisible();
  }

  async isDirectoryHeadingVisible() {
    return this.directoryPage.locators.heading.isVisible();
  }

  async isBuzzHeadingVisible() {
    return this.buzzPage.locators.heading.isVisible();
  }
}
