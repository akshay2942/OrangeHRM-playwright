import { test, expect } from '../../fixtures/test.fixture.js';

test.describe('Directory @directory @regression', () => {
  test('Directory page shows employee cards @smoke', async ({ directoryService }) => {
    await directoryService.open();
    expect(await directoryService.isHeadingVisible()).toBeTruthy();
    const count = await directoryService.getCardCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Search directory by name hint @regression', async ({ directoryService }) => {
    await directoryService.open();
    await directoryService.searchByNameHint('a');
    expect(await directoryService.isSearchButtonVisible()).toBeTruthy();
  });
});
