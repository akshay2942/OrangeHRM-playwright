import type { Page } from '@playwright/test';

export const headerLocators = (page: Page) => ({
  header: page.locator('header.oxd-topbar'),
  brandLink: page.locator('.oxd-brand'),
  pageTitle: page.locator('.oxd-topbar-header-breadcrumb, .oxd-topbar-header-title'),
});
