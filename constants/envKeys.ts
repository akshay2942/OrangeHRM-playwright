/**
 * Environment variable key names.
 */
export const ENV_KEYS = Object.freeze({
  TEST_ENV: 'TEST_ENV',
  ENV_NAME: 'ENV_NAME',
  BASE_URL: 'BASE_URL',
  USERNAME: 'USERNAME',
  PASSWORD: 'PASSWORD',
  DEFAULT_TIMEOUT: 'DEFAULT_TIMEOUT',
  NAVIGATION_TIMEOUT: 'NAVIGATION_TIMEOUT',
  EXPECT_TIMEOUT: 'EXPECT_TIMEOUT',
  HEADLESS: 'HEADLESS',
  WORKERS: 'WORKERS',
  RETRIES: 'RETRIES',
} as const);

export type EnvKey = (typeof ENV_KEYS)[keyof typeof ENV_KEYS];
