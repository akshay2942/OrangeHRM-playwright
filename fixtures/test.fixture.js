import { test as base, expect } from '@playwright/test';
import { envConfig } from '../config/env.config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { LogoutPage } from '../pages/LogoutPage.js';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage.js';
import { AdminPage } from '../pages/AdminPage.js';
import { PimPage } from '../pages/PimPage.js';
import { EmployeeListPage } from '../pages/EmployeeListPage.js';
import { LeavePage } from '../pages/LeavePage.js';
import { AssignLeavePage } from '../pages/AssignLeavePage.js';
import { TimePage } from '../pages/TimePage.js';
import { RecruitmentPage } from '../pages/RecruitmentPage.js';
import { CandidateListPage } from '../pages/CandidateListPage.js';
import { VacancyPage } from '../pages/VacancyPage.js';
import { MyInfoPage } from '../pages/MyInfoPage.js';
import { PerformancePage } from '../pages/PerformancePage.js';
import { DirectoryPage } from '../pages/DirectoryPage.js';
import { MaintenancePage } from '../pages/MaintenancePage.js';
import { BuzzPage } from '../pages/BuzzPage.js';
import { ClaimPage } from '../pages/ClaimPage.js';
import { LoginService } from '../services/LoginService.js';
import { DashboardService } from '../services/DashboardService.js';
import { AdminService } from '../services/AdminService.js';
import { PimService } from '../services/PimService.js';
import { LeaveService } from '../services/LeaveService.js';
import { TimeService } from '../services/TimeService.js';
import { RecruitmentService } from '../services/RecruitmentService.js';
import { DirectoryService } from '../services/DirectoryService.js';
import { PerformanceService } from '../services/PerformanceService.js';
import { BuzzService } from '../services/BuzzService.js';
import { NavigationService } from '../services/NavigationService.js';
import { ApiUtility } from '../utils/apiUtility.js';
import { ScreenshotUtility } from '../utils/screenshotUtility.js';
import { logExecutionStart, logExecutionEnd, logger } from '../utils/logger.js';

/**
 * Custom fixtures exposed to every test. This explicit type is what lets the
 * JavaScript language service resolve methods such as dashboardService
 * .isSideMenuVisible() back to their declarations.
 *
 * @typedef {object} TestFixtures
 * @property {LoginPage} loginPage
 * @property {DashboardPage} dashboardPage
 * @property {LogoutPage} logoutPage
 * @property {ForgotPasswordPage} forgotPasswordPage
 * @property {AdminPage} adminPage
 * @property {PimPage} pimPage
 * @property {EmployeeListPage} employeeListPage
 * @property {LeavePage} leavePage
 * @property {AssignLeavePage} assignLeavePage
 * @property {TimePage} timePage
 * @property {RecruitmentPage} recruitmentPage
 * @property {CandidateListPage} candidateListPage
 * @property {VacancyPage} vacancyPage
 * @property {MyInfoPage} myInfoPage
 * @property {PerformancePage} performancePage
 * @property {DirectoryPage} directoryPage
 * @property {MaintenancePage} maintenancePage
 * @property {BuzzPage} buzzPage
 * @property {ClaimPage} claimPage
 * @property {LoginService} loginService
 * @property {DashboardService} dashboardService
 * @property {AdminService} adminService
 * @property {PimService} pimService
 * @property {LeaveService} leaveService
 * @property {TimeService} timeService
 * @property {RecruitmentService} recruitmentService
 * @property {DirectoryService} directoryService
 * @property {PerformanceService} performanceService
 * @property {BuzzService} buzzService
 * @property {NavigationService} navigationService
 * @property {import('@playwright/test').APIRequestContext} apiContext
 * @property {ApiUtility} apiUtility
 * @property {(username?: string, password?: string) => Promise<void>} authenticate
 */
/**
 * Keep Playwright's built-in fixtures (`page`, `browser`, etc.) alongside the
 * custom fixtures above.
 * @type {import('@playwright/test').TestType<
 *   import('@playwright/test').PlaywrightTestArgs &
 *   import('@playwright/test').PlaywrightTestOptions &
 *   TestFixtures,
 *   import('@playwright/test').PlaywrightWorkerArgs &
 *   import('@playwright/test').PlaywrightWorkerOptions
 * >}
 */
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },

  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },

  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },

  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },

  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },

  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },

  assignLeavePage: async ({ page }, use) => {
    await use(new AssignLeavePage(page));
  },

  timePage: async ({ page }, use) => {
    await use(new TimePage(page));
  },

  recruitmentPage: async ({ page }, use) => {
    await use(new RecruitmentPage(page));
  },

  candidateListPage: async ({ page }, use) => {
    await use(new CandidateListPage(page));
  },

  vacancyPage: async ({ page }, use) => {
    await use(new VacancyPage(page));
  },

  myInfoPage: async ({ page }, use) => {
    await use(new MyInfoPage(page));
  },

  performancePage: async ({ page }, use) => {
    await use(new PerformancePage(page));
  },

  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },

  maintenancePage: async ({ page }, use) => {
    await use(new MaintenancePage(page));
  },

  buzzPage: async ({ page }, use) => {
    await use(new BuzzPage(page));
  },

  claimPage: async ({ page }, use) => {
    await use(new ClaimPage(page));
  },

  loginService: async (
    { loginPage, dashboardPage, logoutPage, forgotPasswordPage },
    use,
  ) => {
    await use(
      new LoginService({ loginPage, dashboardPage, logoutPage, forgotPasswordPage }),
    );
  },

  dashboardService: async ({ dashboardPage }, use) => {
    await use(new DashboardService({ dashboardPage }));
  },

  adminService: async ({ adminPage, pimPage, employeeListPage }, use) => {
    await use(new AdminService({ adminPage, pimPage, employeeListPage }));
  },

  pimService: async ({ pimPage, employeeListPage }, use) => {
    await use(new PimService({ pimPage, employeeListPage }));
  },

  leaveService: async ({ leavePage, assignLeavePage }, use) => {
    await use(new LeaveService({ leavePage, assignLeavePage }));
  },

  timeService: async ({ timePage }, use) => {
    await use(new TimeService({ timePage }));
  },

  recruitmentService: async (
    { candidateListPage, vacancyPage, recruitmentPage },
    use,
  ) => {
    await use(
      new RecruitmentService({ candidateListPage, vacancyPage, recruitmentPage }),
    );
  },

  directoryService: async ({ directoryPage }, use) => {
    await use(new DirectoryService({ directoryPage }));
  },

  performanceService: async ({ performancePage }, use) => {
    await use(new PerformanceService({ performancePage }));
  },

  buzzService: async ({ buzzPage }, use) => {
    await use(new BuzzService({ buzzPage }));
  },

  navigationService: async (
    {
      adminPage,
      employeeListPage,
      assignLeavePage,
      timePage,
      candidateListPage,
      vacancyPage,
      myInfoPage,
      directoryPage,
      buzzPage,
      claimPage,
      performancePage,
      maintenancePage,
    },
    use,
  ) => {
    await use(
      new NavigationService({
        adminPage,
        employeeListPage,
        assignLeavePage,
        timePage,
        candidateListPage,
        vacancyPage,
        myInfoPage,
        directoryPage,
        buzzPage,
        claimPage,
        performancePage,
        maintenancePage,
      }),
    );
  },

  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: envConfig.baseURL,
    });
    await use(context);
    await context.dispose();
  },

  apiUtility: async ({ apiContext }, use) => {
    await use(new ApiUtility(apiContext));
  },

  authenticate: async ({ page, loginService, dashboardPage }, use) => {
    const authenticate = async (
      username = envConfig.username,
      password = envConfig.password,
    ) => {
      await dashboardPage.open();

      try {
        await dashboardPage.locators.dashboardHeading.waitFor({
          state: 'visible',
          timeout: 10000,
        });
        return;
      } catch {
        // Session expired or missing — perform UI login.
      }

      await loginService.openLoginPage();
      await loginService.loginAndWaitForDashboard(username, password);
      await page.waitForURL(/dashboard/i);
    };
    await use(authenticate);
  },

  page: async ({ page }, use, testInfo) => {
    const startedAt = Date.now();
    logExecutionStart(testInfo.title, {
      browser: testInfo.project.name,
      environment: envConfig.envName,
    });

    await use(page);

    if (testInfo.status !== testInfo.expectedStatus) {
      logger.error(`Test failed: ${testInfo.title}`, {
        status: testInfo.status,
        error: testInfo.error?.message,
      });
      try {
        await ScreenshotUtility.capture(page, `failure_${testInfo.title}`);
      } catch (error) {
        logger.warn('Failed to capture failure screenshot', {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    logExecutionEnd(testInfo.title, Date.now() - startedAt, {
      browser: testInfo.project.name,
      status: testInfo.status,
    });
  },
});

export { expect };
