import type { APIRequestContext, APIResponse } from '@playwright/test';
import { logger } from '../utils/logger.js';

export interface WrappedResponse {
  ok: boolean;
  status: number;
  body: unknown;
}

/**
 * Shared API client helpers using Playwright APIRequestContext.
 */
export class CommonAPI {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async wrap(response: APIResponse): Promise<WrappedResponse> {
    let body: unknown = null;
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

  /** Returns true when the endpoint is reachable (not 404/502/503). */
  async isAvailable(path: string): Promise<boolean> {
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
