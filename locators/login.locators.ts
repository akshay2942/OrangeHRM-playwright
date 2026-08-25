import type { Page } from '@playwright/test';

export const loginLocators = (page: Page) => ({
  usernameInput: page.getByPlaceholder('Username'),
  passwordInput: page.getByPlaceholder('Password'),
  loginButton: page.getByRole('button', { name: 'Login' }),
  forgotPasswordLink: page.getByText('Forgot your password?'),
  errorAlert: page.locator('.oxd-alert-content-text'),
  requiredMessages: page.getByText('Required', { exact: true }),
  loginTitle: page.getByText('Login', { exact: true }),
  orangeHrmLogo: page.locator('.orangehrm-login-branding img, .orangehrm-login-logo img'),
});
