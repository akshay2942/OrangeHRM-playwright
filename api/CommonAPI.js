import { logger } from '../utils/logger.js';

/**
 * Shared API client helpers using Playwright APIRequestContext.
 */
export class CommonAPI {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   * @returns {Promise<{ ok: boolean, status: number, body: unknown }>}
   */
  async wrap(response) {
    let body = null;
    try {
      body = await response.json();
    } catch {
      body = await response.text().catch(() => null);
    }
    return {
      ok: response.ok(),
      status: response.status(),
      body,
    };
  }

  /**
   * Returns true when the endpoint is reachable (not 404/502/503).
   * @param {string} path
   */
  async isAvailable(path) {
    try {
      const response = await this.request.get(path, { failOnStatusCode: false });
      const available = ![404, 502, 503].includes(response.status());
      if (!available) {
        logger.warn(`API endpoint unavailable: ${path}`, { status: response.status() });
      }
      return available;
    } catch (error) {
      logger.warn(`API availability check failed: ${path}`, {
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }
}
