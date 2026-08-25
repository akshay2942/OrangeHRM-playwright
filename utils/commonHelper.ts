/**
 * Common helper functions shared across tests and pages.
 */
export class CommonHelper {
  static joinUrl(baseURL: string, pathPart: string): string {
    return `${baseURL.replace(/\/$/, '')}/${pathPart.replace(/^\//, '')}`;
  }

  static isBlank(value: unknown): boolean {
    return value === null || value === undefined || String(value).trim() === '';
  }

  static sanitizeFileName(value: string): string {
    return value.replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
  }

  static async measure<T>(
    action: () => Promise<T>,
  ): Promise<{ result: T; durationMs: number }> {
    const start = Date.now();
    const result = await action();
    return { result, durationMs: Date.now() - start };
  }
}
