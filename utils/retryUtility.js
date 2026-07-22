import { TIMEOUTS } from '../constants/timeouts.js';
import { logger } from './logger.js';

/**
 * Retry helper for flaky interactions.
 */
export class RetryUtility {
  /**
   * Retries an async action until it succeeds or attempts are exhausted.
   * @template T
   * @param {() => Promise<T>} action
   * @param {{ retries?: number, delayMs?: number, label?: string }} [options]
   * @returns {Promise<T>}
   */
  static async retry(action, options = {}) {
    const retries = options.retries ?? 3;
    const delayMs = options.delayMs ?? TIMEOUTS.RETRY_DELAY;
    const label = options.label ?? 'operation';
    let lastError;

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
