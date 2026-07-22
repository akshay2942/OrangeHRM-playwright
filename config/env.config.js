import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Resolves and loads environment variables from `.env.{TEST_ENV}`.
 * Defaults to QA when TEST_ENV is not provided.
 * @returns {{ envName: string, baseURL: string, username: string, password: string, defaultTimeout: number, navigationTimeout: number, expectTimeout: number, headless: boolean, workers: number, retries: number, rootDir: string, storageStatePath: string }}
 */
export function loadEnvConfig() {
  const testEnv = (process.env.TEST_ENV || 'qa').toLowerCase();
  const envFile = path.join(rootDir, `.env.${testEnv}`);

  dotenv.config({ path: envFile });

  return {
    envName: process.env.ENV_NAME || testEnv.toUpperCase(),
    baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    username: process.env.USERNAME || 'Admin',
    password: process.env.PASSWORD || 'admin123',
    defaultTimeout: Number(process.env.DEFAULT_TIMEOUT || 30000),
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT || 60000),
    expectTimeout: Number(process.env.EXPECT_TIMEOUT || 10000),
    headless: String(process.env.HEADLESS || 'true').toLowerCase() !== 'false',
    workers: Number(process.env.WORKERS || 4),
    retries: Number(process.env.RETRIES || 1),
    rootDir,
    storageStatePath: path.join(rootDir, 'data', 'auth', 'storageState.json'),
  };
}

export const envConfig = loadEnvConfig();
