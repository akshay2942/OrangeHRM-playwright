import { CommonAPI } from './CommonAPI.js';
import { ENDPOINTS } from '../constants/endpoints.js';

/**
 * Recruitment API client.
 */
export class RecruitmentAPI extends CommonAPI {
  async listCandidates(params: Record<string, string | number> = { limit: 20, offset: 0 }) {
    const response = await this.request.get(ENDPOINTS.CANDIDATES, {
      params,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }

  async listVacancies(params: Record<string, string | number> = { limit: 20, offset: 0 }) {
    const response = await this.request.get(ENDPOINTS.VACANCIES, {
      params,
      failOnStatusCode: false,
    });
    return this.wrap(response);
  }
}
