import { BasePage } from './BasePage.js';
import { recruitmentLocators } from '../locators/recruitment.locators.js';
import { URLS } from '../constants/urls.js';
import { LeftMenu } from '../components/LeftMenu.js';

/**
 * Recruitment module shell / navigation actions.
 */
export class RecruitmentPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.locators = recruitmentLocators(page);
    this.leftMenu = new LeftMenu(page);
  }

  async openCandidates() {
    await this.goto(URLS.RECRUITMENT_CANDIDATES);
    await this.waitForLoad();
  }

  async openVacancies() {
    await this.goto(URLS.RECRUITMENT_VACANCIES);
    await this.waitForLoad();
  }

  async openViaMenu() {
    await this.leftMenu.openRecruitment();
    await this.waitForLoad();
  }
}
