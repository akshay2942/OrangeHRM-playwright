import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './config/env.config.js';

/**
 * Playwright enterprise configuration for OrangeHRM.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : envConfig.retries,
  workers: process.env.CI ? 2 : envConfig.workers,
  timeout: envConfig.defaultTimeout,
  expect: {
    timeout: envConfig.expectTimeout,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true,
        environmentInfo: {
          Environment: envConfig.envName,
          BaseURL: envConfig.baseURL,
          Browser: 'Multi-browser',
        },
      },
    ],
    ['json', { outputFile: 'reports/execution-summary.json' }],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: envConfig.baseURL,
    headless: envConfig.headless,
    actionTimeout: envConfig.defaultTimeout,
    navigationTimeout: envConfig.navigationTimeout,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.(ts|js)/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: envConfig.storageStatePath,
      },
      dependencies: ['setup'],
      testIgnore: [/auth\.setup\.(ts|js)/, /login\//],
    },
    {
      name: 'chromium-login',
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
      },
      testMatch: /login\/.*\.spec\.(ts|js)/,
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: envConfig.storageStatePath,
      },
      dependencies: ['setup'],
      testIgnore: [/auth\.setup\.(ts|js)/, /login\//, /scaffold\.spec\.(ts|js)/],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: envConfig.storageStatePath,
      },
      dependencies: ['setup'],
      testIgnore: [/auth\.setup\.(ts|js)/, /login\//, /scaffold\.spec\.(ts|js)/],
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        storageState: envConfig.storageStatePath,
      },
      dependencies: ['setup'],
      testIgnore: [/auth\.setup\.(ts|js)/, /login\//, /scaffold\.spec\.(ts|js)/],
    },
  ],
});
