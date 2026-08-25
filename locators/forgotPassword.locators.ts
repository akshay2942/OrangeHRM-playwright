import type { Page } from '@playwright/test';

export const forgotPasswordLocators = (page: Page) => ({
  usernameInput: page.getByPlaceholder('Username'),
  resetButton: page.getByRole('button', { name: 'Reset Password' }),
  cancelButton: page.getByRole('button', { name: 'Cancel' }),
  title: page.getByRole('heading', { name: /Reset Password|Forgot Your Password/i }),
  successMessage: page.locator('.orangehrm-forgot-password-title, .oxd-text--h6').filter({
    hasText: /Reset Password|link sent|successfully/i,
  }),
  infoText: page.getByText(/identify your account|reset your password|sent successfully/i),
});
