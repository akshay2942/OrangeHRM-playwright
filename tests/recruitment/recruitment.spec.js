import { test, expect } from '../../fixtures/test.fixture.js';
import { RandomDataGenerator } from '../../utils/randomData.js';

test.describe('Recruitment candidates @recruitment @regression', () => {
  test('Add candidate successfully @smoke', async ({ recruitmentService, page }) => {
    test.setTimeout(60000);
    const candidate = RandomDataGenerator.candidate();

    await recruitmentService.addCandidate({
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      contact: candidate.contactNumber,
    });

    await expect(page).toHaveURL(/addCandidate\/\d+/i);
  });

  test('Vacancies list loads @smoke', async ({ recruitmentService, page }) => {
    await recruitmentService.openVacancies();
    await expect(page).toHaveURL(/viewJobVacancy/i);
    expect(await recruitmentService.isVacanciesHeadingVisible()).toBeTruthy();
  });
});
