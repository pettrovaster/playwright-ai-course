import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly formFieldsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formFieldsLink = page.getByRole('link', { name: 'Form Fields' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practice-automation.com/');
  }

  async clickFormFields(): Promise<void> {
    await this.formFieldsLink.click();
  }
}