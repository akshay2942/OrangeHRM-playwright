import { test as setup, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { envConfig } from '../config/env.config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { LogoutPage } from '../pages/LogoutPage.js';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage.js';
import { LoginService } from '../services/LoginService.js';
import { logger } from '../utils/logger.js';

const authDir = path.dirname(envConfig.storageStatePath);

setup('authenticate and save storage state @smoke', async ({ page }) => {
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  logger.info('Auth setup started', { env: envConfig.envName });
  const loginService = new LoginService({
    loginPage: new LoginPage(page),
    dashboardPage: new DashboardPage(page),
    logoutPage: new LogoutPage(page),
    forgotPasswordPage: new ForgotPasswordPage(page),
  });

  await loginService.openLoginPage();
  await loginService.loginAndWaitForDashboard(envConfig.username, envConfig.password);
  await expect(page).toHaveURL(/dashboard/i);

  await page.context().storageState({ path: envConfig.storageStatePath });
  logger.info(`Storage state saved to ${envConfig.storageStatePath}`);
});
