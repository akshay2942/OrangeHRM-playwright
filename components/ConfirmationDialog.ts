import type { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { confirmationDialogLocators } from '../locators/confirmationDialog.locators.js';

/**
 * Confirmation dialog component (delete / confirm flows).
 */
export class ConfirmationDialog extends BasePage {
  readonly locators: ReturnType<typeof confirmationDialogLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = confirmationDialogLocators(page);
  }

  async waitForOpen() {
    await this.waitForElement(this.locators.dialog.first());
  }

  async confirm() {
    const yesDelete = this.locators.yesButton;
    if (await yesDelete.count()) {
      await this.safeClick(yesDelete);
      return;
    }
    await this.safeClick(this.locators.confirmButton.first());
  }

  async cancel() {
    const noCancel = this.locators.noButton;
    if (await noCancel.count()) {
      await this.safeClick(noCancel);
      return;
    }
    await this.safeClick(this.locators.cancelButton.first());
  }
}
