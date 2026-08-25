import type { PerformancePage } from '../pages/PerformancePage.js';

export interface PerformanceServiceDeps {
  performancePage: PerformancePage;
}

/**
 * Performance module workflows.
 */
export class PerformanceService {
  readonly performancePage: PerformancePage;

  constructor({ performancePage }: PerformanceServiceDeps) {
    this.performancePage = performancePage;
  }

  async open() {
    await this.performancePage.open();
  }

  async hasSearchOrResetControls() {
    const search = this.performancePage.page.getByRole('button', { name: 'Search' });
    const reset = this.performancePage.page.getByRole('button', { name: 'Reset' });
    return (await search.isVisible().catch(() => false)) || (await reset.isVisible().catch(() => false));
  }
}
