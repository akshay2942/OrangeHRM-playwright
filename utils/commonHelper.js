/**
 * Common helper functions shared across tests and pages.
 */
export class CommonHelper {
  /**
   * Builds an absolute URL from base and path.
   * @param {string} baseURL
   * @param {string} pathPart
   * @returns {string}
   */
  static joinUrl(baseURL, pathPart) {
    return `${baseURL.replace(/\/$/, '')}/${pathPart.replace(/^\//, '')}`;
  }

  /**
   * Returns true when value is nullish or blank.
   * @param {unknown} value
   * @returns {boolean}
   */
  static isBlank(value) {
    return value === null || value === undefined || String(value).trim() === '';
  }

  /**
   * Sanitizes a string for use in file names.
   * @param {string} value
   * @returns {string}
   */
  static sanitizeFileName(value) {
    return value.replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
  }

  /**
   * Measures async action duration in milliseconds.
   * @template T
   * @param {() => Promise<T>} action
   * @returns {Promise<{ result: T, durationMs: number }>}
   */
  static async measure(action) {
    const start = Date.now();
    const result = await action();
    return { result, durationMs: Date.now() - start };
  }
}
