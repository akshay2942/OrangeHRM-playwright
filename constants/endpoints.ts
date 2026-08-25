/**
 * API endpoint path constants for OrangeHRM REST API.
 */
export const ENDPOINTS = Object.freeze({
  AUTH_LOGIN: '/web/index.php/auth/validate',
  EMPLOYEES: '/web/index.php/api/v2/pim/employees',
  EMPLOYEE_BY_ID: (id: string | number) => `/web/index.php/api/v2/pim/employees/${id}`,
  LEAVE_REQUESTS: '/web/index.php/api/v2/leave/employees/leave-requests',
  CANDIDATES: '/web/index.php/api/v2/recruitment/candidates',
  VACANCIES: '/web/index.php/api/v2/recruitment/vacancies',
  SYSTEM_USERS: '/web/index.php/api/v2/admin/users',
});
