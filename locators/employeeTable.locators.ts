import type { Page } from '@playwright/test';

export const employeeTableLocators = (page: Page) => ({
  table: page.locator('.oxd-table'),
  rows: page.locator('.oxd-table-body .oxd-table-card, .oxd-table-body .oxd-table-row'),
  headerCells: page.locator('.oxd-table-header .oxd-table-header-cell'),
  checkboxAll: page.locator('.oxd-table-header input[type="checkbox"]'),
  noRecords: page.getByText('No Records Found'),
  rowByText: (text: string) =>
    page.locator('.oxd-table-body .oxd-table-card, .oxd-table-body .oxd-table-row').filter({
      hasText: text,
    }),
  editButtonInRow: (text: string) =>
    page
      .locator('.oxd-table-body .oxd-table-card, .oxd-table-body .oxd-table-row')
      .filter({ hasText: text })
      .locator('button')
      .filter({ has: page.locator('i.bi-pencil-fill') })
      .first(),
  deleteButtonInRow: (text: string) =>
    page
      .locator('.oxd-table-body .oxd-table-card, .oxd-table-body .oxd-table-row')
      .filter({ hasText: text })
      .locator('button')
      .filter({ has: page.locator('i.bi-trash') })
      .first(),
});
