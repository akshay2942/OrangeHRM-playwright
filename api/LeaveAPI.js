import { CommonAPI } from './CommonAPI.js';
import { ENDPOINTS } from '../constants/endpoints.js';

/**
 * Leave API client.
 */
export class LeaveAPI extends CommonAPI {
  /**
   * @param {Record<string, string|number>} [params]
   */
  async listRequests(params = {}) {
    const response = await this.request.get(ENDPOINTS.LEAVE_REQUESTS, {
      params,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }
}
