import type { APIRequestContext, APIResponse } from '@playwright/test';
import { logger } from './logger.js';

/**
 * Thin wrapper around Playwright APIRequestContext helpers.
 */
export class ApiUtility {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(url: string, options: Parameters<APIRequestContext['get']>[1] = {}): Promise<APIResponse> {
    logger.info(`API GET ${url}`);
    return this.request.get(url, options);
  }

  async post(
    url: string,
    options: Parameters<APIRequestContext['post']>[1] = {},
  ): Promise<APIResponse> {
    logger.info(`API POST ${url}`);
    return this.request.post(url, options);
  }

  async put(
    url: string,
    options: Parameters<APIRequestContext['put']>[1] = {},
  ): Promise<APIResponse> {
    logger.info(`API PUT ${url}`);
    return this.request.put(url, options);
  }

  async delete(
    url: string,
    options: Parameters<APIRequestContext['delete']>[1] = {},
  ): Promise<APIResponse> {
    logger.info(`API DELETE ${url}`);
    return this.request.delete(url, options);
  }

  async parseJson(response: APIResponse): Promise<unknown> {
    return response.json();
  }
}
