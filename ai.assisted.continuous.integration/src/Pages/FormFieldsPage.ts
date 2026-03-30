import { Page, Locator } from '@playwright/test';

export class FormFieldsPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Form Fields' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practice-automation.com/form-fields/');
  }
}