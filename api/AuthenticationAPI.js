import { CommonAPI } from './CommonAPI.js';
import { ENDPOINTS } from '../constants/endpoints.js';

/**
 * Authentication-related API helpers.
 */
export class AuthenticationAPI extends CommonAPI {
  /**
   * Attempts session validation / login endpoint.
   * @param {{ username: string, password: string }} credentials
   */
  async validate(credentials) {
    const response = await this.request.post(ENDPOINTS.AUTH_LOGIN, {
      form: {
        username: credentials.username,
        password: credentials.password,
      },
      failOnStatusCode: false,
      maxRedirects: 0,
    });
    return this.wrap(response);
  }
}
