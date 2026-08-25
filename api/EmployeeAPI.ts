import { CommonAPI } from './CommonAPI.js';
import { ENDPOINTS } from '../constants/endpoints.js';

/**
 * PIM Employee API client.
 */
export class EmployeeAPI extends CommonAPI {
  async list(params: { limit?: number; offset?: number } = { limit: 20, offset: 0 }) {
    const response = await this.request.get(ENDPOINTS.EMPLOYEES, {
      params,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  async getById(id: string | number) {
    const response = await this.request.get(ENDPOINTS.EMPLOYEE_BY_ID(id), {
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  async create(payload: Record<string, unknown>) {
    const response = await this.request.post(ENDPOINTS.EMPLOYEES, {
      data: payload,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  async remove(id: string | number) {
    const response = await this.request.delete(ENDPOINTS.EMPLOYEE_BY_ID(id), {
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }
}
