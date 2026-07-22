import { test, expect } from '../../fixtures/test.fixture.js';

/**
 * Smoke navigation across modules using navigation service (@smoke).
 */
test.describe('Module navigation @smoke', () => {
  test('Admin module loads', async ({ navigationService, page }) => {
    await navigationService.openAdmin();
    await expect(page).toHaveURL(/admin\/viewSystemUsers/i);
    expect(await navigationService.isAdminHeadingVisible()).toBeTruthy();
  });

  test('PIM employee list loads', async ({ navigationService, page }) => {
    await navigationService.openEmployeeList();
    await expect(page).toHaveURL(/pim\/viewEmployeeList/i);
    expect(await navigationService.isEmployeeListHeadingVisible()).toBeTruthy();
  });

  test('Leave assign page loads', async ({ navigationService, page }) => {
    await navigationService.openAssignLeave();
    await expect(page).toHaveURL(/leave\/assignLeave/i);
    expect(await navigationService.isAssignLeaveHeadingVisible()).toBeTruthy();
  });

  test('Time module loads', async ({ navigationService, page }) => {
    await navigationService.openTime();
    await expect(page).toHaveURL(/time\//i);
  });

  test('Recruitment candidates load', async ({ navigationService, page }) => {
    await navigationService.openCandidates();
    await expect(page).toHaveURL(/recruitment\/viewCandidates/i);
    expect(await navigationService.isCandidatesHeadingVisible()).toBeTruthy();
  });

  test('Vacancies page loads', async ({ navigationService, page }) => {
    await navigationService.openVacancies();
    await expect(page).toHaveURL(/recruitment\/viewJobVacancy/i);
    expect(await navigationService.isVacanciesHeadingVisible()).toBeTruthy();
  });

  test('My Info loads', async ({ navigationService, page }) => {
    await navigationService.openMyInfo();
    await expect(page).toHaveURL(/pim\/viewPersonalDetails/i);
  });

  test('Directory loads', async ({ navigationService, page }) => {
    await navigationService.openDirectory();
    await expect(page).toHaveURL(/directory\/viewDirectory/i);
    expect(await navigationService.isDirectoryHeadingVisible()).toBeTruthy();
  });

  test('Buzz loads', async ({ navigationService, page }) => {
    await navigationService.openBuzz();
    await expect(page).toHaveURL(/buzz\/viewBuzz/i);
    expect(await navigationService.isBuzzHeadingVisible()).toBeTruthy();
  });

  test('Claim loads', async ({ navigationService, page }) => {
    await navigationService.openClaim();
    await expect(page).toHaveURL(/claim\//i);
  });

  test('Performance loads', async ({ navigationService, page }) => {
    await navigationService.openPerformance();
    await expect(page).toHaveURL(/performance\//i);
  });

  test('Maintenance password gate loads', async ({ navigationService, page }) => {
    await navigationService.openMaintenance();
    await expect(page).toHaveURL(/maintenance\//i);
  });
});
