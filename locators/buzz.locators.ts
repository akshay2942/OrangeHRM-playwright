import type { Page } from '@playwright/test';

export const buzzLocators = (page: Page) => ({
  heading: page.getByRole('heading', { name: 'Buzz' }),
  postInput: page.getByPlaceholder(/post|What's on your mind/i),
  postButton: page.getByRole('button', { name: 'Post' }),
  sharePhotosButton: page.getByRole('button', { name: /Share Photos|Share Video/i }).first(),
  posts: page.locator('.orangehrm-buzz-post'),
  postByText: (text: string) => page.locator('.orangehrm-buzz-post').filter({ hasText: text }),
  likeButtonInPost: (text: string) =>
    page
      .locator('.orangehrm-buzz-post')
      .filter({ hasText: text })
      .locator('button')
      .filter({ hasText: /Like|Heart/i })
      .first(),
});
