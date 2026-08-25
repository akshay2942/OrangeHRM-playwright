import type { BuzzPage } from '../pages/BuzzPage.js';

export interface BuzzServiceDeps {
  buzzPage: BuzzPage;
}

/**
 * Buzz feed workflows.
 */
export class BuzzService {
  readonly buzzPage: BuzzPage;

  constructor({ buzzPage }: BuzzServiceDeps) {
    this.buzzPage = buzzPage;
  }

  async open() {
    await this.buzzPage.open();
  }

  async isHeadingVisible() {
    return this.buzzPage.locators.heading.isVisible();
  }

  async createPost(text: string) {
    await this.buzzPage.createPost(text);
  }

  async hasPost(text: string) {
    return this.buzzPage.hasPost(text);
  }
}
