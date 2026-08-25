/**
 * Application URL path constants for OrangeHRM.
 */
export const URLS = Object.freeze({
  LOGIN: '/web/index.php/auth/login',
  DASHBOARD: '/web/index.php/dashboard/index',
  ADMIN_USERS: '/web/index.php/admin/viewSystemUsers',
  PIM_EMPLOYEE_LIST: '/web/index.php/pim/viewEmployeeList',
  PIM_ADD_EMPLOYEE: '/web/index.php/pim/addEmployee',
  LEAVE_ASSIGN: '/web/index.php/leave/assignLeave',
  LEAVE_APPLY: '/web/index.php/leave/applyLeave',
  LEAVE_LIST: '/web/index.php/leave/viewLeaveList',
  TIME_TIMESHEETS: '/web/index.php/time/viewEmployeeTimesheet',
  RECRUITMENT_CANDIDATES: '/web/index.php/recruitment/viewCandidates',
  RECRUITMENT_VACANCIES: '/web/index.php/recruitment/viewJobVacancy',
  MY_INFO: '/web/index.php/pim/viewPersonalDetails',
  PERFORMANCE: '/web/index.php/performance/searchEvaluatePerformanceReview',
  DIRECTORY: '/web/index.php/directory/viewDirectory',
  MAINTENANCE: '/web/index.php/maintenance/purgeEmployee',
  BUZZ: '/web/index.php/buzz/viewBuzz',
  CLAIM: '/web/index.php/claim/viewAssignClaim',
  FORGOT_PASSWORD: '/web/index.php/auth/requestPasswordResetCode',
} as const);

export type UrlKey = keyof typeof URLS;
