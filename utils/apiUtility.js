import { logger } from './logger.js';

/**
 * Thin wrapper around Playwright APIRequestContext helpers.
 */
export class ApiUtility {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  /**
   * @param {string} url
   * @param {import('@playwright/test').APIRequestContext['get'] extends (...args: infer A) => any ? A[1] : never} [options]
   */
  async get(url, options = {}) {
    logger.info(`API GET ${url}`);
    return this.request.get(url, options);
  }

  /**
   * @param {string} url
   * @param {Record<string, unknown>} [options]
   */
  async post(url, options = {}) {
    logger.info(`API POST ${url}`);
    return this.request.post(url, options);
  }

  /**
   * @param {string} url
   * @param {Record<string, unknown>} [options]
   */
  async put(url, options = {}) {
    logger.info(`API PUT ${url}`);
    return this.request.put(url, options);
  }

  /**
   * @param {string} url
   * @param {Record<string, unknown>} [options]
   */
  async delete(url, options = {}) {
    logger.info(`API DELETE ${url}`);
    return this.request.delete(url, options);
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   * @returns {Promise<unknown>}
   */
  async parseJson(response) {
    return response.json();
  }
}
