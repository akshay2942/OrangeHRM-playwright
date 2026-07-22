import { test, expect } from '../../fixtures/test.fixture.js';
import { envConfig } from '../../config/env.config.js';
import {
  AuthenticationAPI,
  EmployeeAPI,
  LeaveAPI,
  RecruitmentAPI,
  ENDPOINTS,
} from '../../api/index.js';

/**
 * API smoke suite. OrangeHRM demo REST may require session cookies or be limited;
 * tests skip gracefully when endpoints are unavailable.
 */
test.describe('API layer @api @smoke', () => {
  test('Auth validate endpoint responds', async ({ apiContext }) => {
    const authApi = new AuthenticationAPI(apiContext);
    const result = await authApi.validate({
      username: envConfig.username,
      password: envConfig.password,
    });
    expect([200, 302, 303, 401, 403]).toContain(result.status);
  });

  test('Employee list API (skip if unavailable)', async ({ request }) => {
    // Reuse browser storage cookies for authenticated REST calls when possible.
    const employeeApi = new EmployeeAPI(request);
    const available = await employeeApi.isAvailable(ENDPOINTS.EMPLOYEES);
    test.skip(!available, 'Employee API not available on this environment');

    const result = await employeeApi.list({ limit: 5, offset: 0 });
    expect([200, 401, 403]).toContain(result.status);
    if (result.status === 200) {
      expect(result.body).toBeTruthy();
    }
  });

  test('Leave requests API (skip if unavailable)', async ({ request }) => {
    const leaveApi = new LeaveAPI(request);
    const available = await leaveApi.isAvailable(ENDPOINTS.LEAVE_REQUESTS);
    test.skip(!available, 'Leave API not available on this environment');

    const result = await leaveApi.listRequests();
    expect([200, 401, 403]).toContain(result.status);
  });

  test('Recruitment candidates API (skip if unavailable)', async ({ request }) => {
    const recruitmentApi = new RecruitmentAPI(request);
    const available = await recruitmentApi.isAvailable(ENDPOINTS.CANDIDATES);
    test.skip(!available, 'Recruitment API not available on this environment');

    const result = await recruitmentApi.listCandidates({ limit: 5 });
    expect([200, 401, 403]).toContain(result.status);
  });
});
