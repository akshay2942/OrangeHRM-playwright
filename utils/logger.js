import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import { envConfig } from '../config/env.config.js';

const logsDir = path.join(envConfig.rootDir, 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Enterprise logger for test execution diagnostics.
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaText = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaText}`;
    }),
  ),
  defaultMeta: {
    environment: envConfig.envName,
  },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDir, 'execution.log'),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
    }),
  ],
});

/**
 * Logs execution start metadata.
 * @param {string} suiteName
 * @param {Record<string, unknown>} [meta]
 */
export function logExecutionStart(suiteName, meta = {}) {
  logger.info(`Execution Start: ${suiteName}`, meta);
}

/**
 * Logs execution end metadata.
 * @param {string} suiteName
 * @param {number} durationMs
 * @param {Record<string, unknown>} [meta]
 */
export function logExecutionEnd(suiteName, durationMs, meta = {}) {
  logger.info(`Execution End: ${suiteName}`, { durationMs, ...meta });
}

/**
 * Logs a test step with expected/actual results.
 * @param {string} stepName
 * @param {string} [expected]
 * @param {string} [actual]
 */
export function logStep(stepName, expected = '', actual = '') {
  logger.info(`Step: ${stepName}`, { expected, actual });
}
