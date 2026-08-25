import { test, expect } from '../../fixtures/test.fixture.js';
import { envConfig } from '../../config/env.config.js';
import { JsonUtility } from '../../utils/jsonUtility.js';
import { MESSAGES } from '../../constants/messages.js';

const loginData = await JsonUtility.read<{
  validLogin: { expectedUrlPart: string };
  invalidPassword: { username: string; password: string; expectedError?: string };
  invalidUsername: { username: string; password: string; expectedError?: string };
  emptyUsername: { password: string; expectedRequiredCount: number };
  emptyPassword: { username: string; expectedRequiredCount: number };
  bothEmpty: { expectedRequiredCount: number };
}>('data/login/loginData.json');

test.describe('Login scenarios @smoke @regression', () => {
  test.beforeEach(async ({ loginService }) => {
    await loginService.openLoginPage();
  });

  test('Valid Login @smoke', async ({ loginService, page }) => {
    await loginService.loginAndWaitForDashboard(envConfig.username, envConfig.password);
    await expect(page).toHaveURL(new RegExp(loginData.validLogin.expectedUrlPart, 'i'));
  });

  test('Invalid Password', async ({ loginService }) => {
    const data = loginData.invalidPassword;
    await loginService.loginAs(data.username, data.password);
    const error = await loginService.getErrorMessage();
    expect(error).toContain(data.expectedError || MESSAGES.INVALID_CREDENTIALS);
  });

  test('Invalid Username', async ({ loginService }) => {
    const data = loginData.invalidUsername;
    await loginService.loginAs(data.username, data.password);
    const error = await loginService.getErrorMessage();
    expect(error).toContain(data.expectedError || MESSAGES.INVALID_CREDENTIALS);
  });

  test('Empty Username', async ({ loginService }) => {
    const data = loginData.emptyUsername;
    await loginService.attemptLoginWithEmptyUsername(data.password);
    expect(await loginService.areRequiredMessagesVisible()).toBeTruthy();
    const count = await loginService.getRequiredFieldCount();
    expect(count).toBeGreaterThanOrEqual(data.expectedRequiredCount);
  });

  test('Empty Password', async ({ loginService }) => {
    const data = loginData.emptyPassword;
    await loginService.attemptLoginWithEmptyPassword(data.username);
    expect(await loginService.areRequiredMessagesVisible()).toBeTruthy();
    const count = await loginService.getRequiredFieldCount();
    expect(count).toBeGreaterThanOrEqual(data.expectedRequiredCount);
  });

  test('Both Empty', async ({ loginService }) => {
    const data = loginData.bothEmpty;
    await loginService.attemptLoginWithBothEmpty();
    expect(await loginService.areRequiredMessagesVisible()).toBeTruthy();
    const count = await loginService.getRequiredFieldCount();
    expect(count).toBeGreaterThanOrEqual(data.expectedRequiredCount);
  });

  test('Forgot Password', async ({ loginService, page }) => {
    await loginService.openForgotPassword();
    await expect(page).toHaveURL(/requestPasswordResetCode|reset/i);
    expect(await loginService.isForgotPasswordFormVisible()).toBeTruthy();
  });

  test('Logout @smoke', async ({ loginService, page }) => {
    await loginService.loginAndLogout(envConfig.username, envConfig.password);
    await expect(page).toHaveURL(/auth\/login/i);
    expect(await loginService.isLoginButtonVisible()).toBeTruthy();
  });
});
