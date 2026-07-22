/**
 * Recruitment workflows (candidates / vacancies).
 */
export class RecruitmentService {
  /**
   * @param {{
   *   candidateListPage: import('../pages/CandidateListPage.js').CandidateListPage,
   *   vacancyPage: import('../pages/VacancyPage.js').VacancyPage,
   *   recruitmentPage: import('../pages/RecruitmentPage.js').RecruitmentPage,
   * }} deps
   */
  constructor({ candidateListPage, vacancyPage, recruitmentPage }) {
    this.candidateListPage = candidateListPage;
    this.vacancyPage = vacancyPage;
    this.recruitmentPage = recruitmentPage;
  }

  async openCandidates() {
    await this.candidateListPage.open();
  }

  async openVacancies() {
    await this.vacancyPage.open();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isCandidatesHeadingVisible() {
    return this.candidateListPage.locators.heading.isVisible();
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isVacanciesHeadingVisible() {
    return this.vacancyPage.locators.heading.isVisible();
  }

  /**
   * Adds a candidate, optionally selecting the first vacancy option.
   * @param {{ firstName: string, middleName?: string, lastName: string, email: string, contact?: string }} data
   */
  async addCandidate(data) {
    await this.candidateListPage.open();
    await this.candidateListPage.clickAdd();
    await this.candidateListPage.fillCandidateForm(data);

    await this.candidateListPage.safeClick(this.candidateListPage.locators.vacancyDropdown);
    const vacancyOption = this.candidateListPage.page
      .locator('.oxd-select-dropdown .oxd-select-option')
      .nth(1);
    if (await vacancyOption.isVisible().catch(() => false)) {
      await this.candidateListPage.safeClick(vacancyOption);
    } else {
      await this.candidateListPage.page.keyboard.press('Escape');
    }

    await this.candidateListPage.save();
    await this.candidateListPage.toast.waitForSuccess();
  }
}
