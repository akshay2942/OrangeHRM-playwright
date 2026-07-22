/**
 * Buzz module locators.
 * @param {import('@playwright/test').Page} page
 */
export const buzzLocators = (page) => ({
  heading: page.getByRole('heading', { name: 'Buzz' }),
  postInput: page.getByPlaceholder(/post|What's on your mind/i),
  postButton: page.getByRole('button', { name: 'Post' }),
  sharePhotosButton: page.getByRole('button', { name: /Share Photos|Share Video/i }).first(),
  posts: page.locator('.orangehrm-buzz-post'),
  postByText: (text) => page.locator('.orangehrm-buzz-post').filter({ hasText: text }),
  likeButtonInPost: (text) =>
    page
      .locator('.orangehrm-buzz-post')
      .filter({ hasText: text })
      .locator('button')
      .filter({ hasText: /Like|Heart/i })
      .first(),
});
