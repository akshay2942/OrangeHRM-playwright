/**
 * Buzz feed workflows.
 */
export class BuzzService {
  /**
   * @param {{ buzzPage: import('../pages/BuzzPage.js').BuzzPage }} deps
   */
  constructor({ buzzPage }) {
    this.buzzPage = buzzPage;
  }

  async open() {
    await this.buzzPage.open();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isHeadingVisible() {
    return this.buzzPage.locators.heading.isVisible();
  }

  /**
   * @param {string} text
   */
  async createPost(text) {
    await this.buzzPage.createPost(text);
  }

  /**
   * @param {string} text
   * @returns {Promise<boolean>}
   */
  async hasPost(text) {
    return this.buzzPage.hasPost(text);
  }
}
