import { TIMEOUTS } from '../constants/timeouts.js';
import { logger } from './logger.js';

export interface RetryOptions {
  retries?: number;
  delayMs?: number;
  label?: string;
}

/**
 * Retry helper for flaky interactions.
 */
export class RetryUtility {
  static async retry<T>(action: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
    const retries = options.retries ?? 3;
    const delayMs = options.delayMs ?? TIMEOUTS.RETRY_DELAY;
    const label = options.label ?? 'operation';
    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt += 1) {
      try {
        return await action();
      } catch (error) {
        lastError = error;
        logger.warn(`Retry ${attempt}/${retries} failed for ${label}`, {
          error: error instanceof Error ? error.message : String(error),
        });
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }

    throw lastError;
  }
}
