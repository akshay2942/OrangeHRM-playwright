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
      return `[${timestamp}] [${String(level).toUpperCase()}] ${message}${metaText}`;
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

export function logExecutionStart(suiteName: string, meta: Record<string, unknown> = {}): void {
  logger.info(`Execution Start: ${suiteName}`, meta);
}

export function logExecutionEnd(
  suiteName: string,
  durationMs: number,
  meta: Record<string, unknown> = {},
): void {
  logger.info(`Execution End: ${suiteName}`, { durationMs, ...meta });
}

export function logStep(stepName: string, expected = '', actual = ''): void {
  logger.info(`Step: ${stepName}`, { expected, actual });
}
