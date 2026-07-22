/**
 * Performance module workflows.
 */
export class PerformanceService {
  /**
   * @param {{ performancePage: import('../pages/PerformancePage.js').PerformancePage }} deps
   */
  constructor({ performancePage }) {
    this.performancePage = performancePage;
  }

  async open() {
    await this.performancePage.open();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async hasSearchOrResetControls() {
    const search = this.performancePage.page.getByRole('button', { name: 'Search' });
    const reset = this.performancePage.page.getByRole('button', { name: 'Reset' });
    return (await search.isVisible().catch(() => false)) || (await reset.isVisible().catch(() => false));
  }
}
