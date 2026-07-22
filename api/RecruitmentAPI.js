import { CommonAPI } from './CommonAPI.js';
import { ENDPOINTS } from '../constants/endpoints.js';

/**
 * Recruitment API client.
 */
export class RecruitmentAPI extends CommonAPI {
  /**
   * @param {Record<string, string|number>} [params]
   */
  async listCandidates(params = { limit: 20, offset: 0 }) {
    const response = await this.request.get(ENDPOINTS.CANDIDATES, {
      params,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  /**
   * @param {Record<string, string|number>} [params]
   */
  async listVacancies(params = { limit: 20, offset: 0 }) {
    const response = await this.request.get(ENDPOINTS.VACANCIES, {
      params,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }
}
