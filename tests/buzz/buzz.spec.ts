import { test, expect } from '../../fixtures/test.fixture.js';
import { RandomDataGenerator } from '../../utils/randomData.js';

test.describe('Buzz @buzz @regression', () => {
  test('Buzz feed loads @smoke', async ({ buzzService }) => {
    await buzzService.open();
    expect(await buzzService.isHeadingVisible()).toBeTruthy();
  });

  test('Create buzz post @regression', async ({ buzzService }) => {
    const postText = RandomDataGenerator.buzzPost();
    await buzzService.open();
    await buzzService.createPost(postText);
    await expect.poll(async () => buzzService.hasPost(postText), { timeout: 15000 }).toBeTruthy();
  });
});
