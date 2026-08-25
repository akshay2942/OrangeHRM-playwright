import type { CandidateListPage } from '../pages/CandidateListPage.js';
import type { VacancyPage } from '../pages/VacancyPage.js';
import type { RecruitmentPage } from '../pages/RecruitmentPage.js';

export interface RecruitmentServiceDeps {
  candidateListPage: CandidateListPage;
  vacancyPage: VacancyPage;
  recruitmentPage: RecruitmentPage;
}

/**
 * Recruitment workflows (candidates / vacancies).
 */
export class RecruitmentService {
  readonly candidateListPage: CandidateListPage;
  readonly vacancyPage: VacancyPage;
  readonly recruitmentPage: RecruitmentPage;

  constructor({ candidateListPage, vacancyPage, recruitmentPage }: RecruitmentServiceDeps) {
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

  async isCandidatesHeadingVisible() {
    return this.candidateListPage.locators.heading.isVisible();
  }

  async isVacanciesHeadingVisible() {
    return this.vacancyPage.locators.heading.isVisible();
  }

  /** Adds a candidate, optionally selecting the first vacancy option. */
  async addCandidate(data: {
    firstName: string;
    lastName: string;
    email: string;
    middleName?: string;
    contact?: string;
    vacancy?: string;
    keywords?: string;
    resumePath?: string;
  }) {
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
