import { CommonAPI } from './CommonAPI.js';
import { ENDPOINTS } from '../constants/endpoints.js';

/**
 * PIM Employee API client.
 */
export class EmployeeAPI extends CommonAPI {
  /**
   * @param {{ limit?: number, offset?: number }} [params]
   */
  async list(params = { limit: 20, offset: 0 }) {
    const response = await this.request.get(ENDPOINTS.EMPLOYEES, {
      params,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  /**
   * @param {string|number} id
   */
  async getById(id) {
    const response = await this.request.get(ENDPOINTS.EMPLOYEE_BY_ID(id), {
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  /**
   * @param {Record<string, unknown>} payload
   */
  async create(payload) {
    const response = await this.request.post(ENDPOINTS.EMPLOYEES, {
      data: payload,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  /**
   * @param {string|number} id
   */
  async remove(id) {
    const response = await this.request.delete(ENDPOINTS.EMPLOYEE_BY_ID(id), {
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }
}
