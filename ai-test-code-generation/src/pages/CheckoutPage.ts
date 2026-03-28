import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
  }

  async getTotal(): Promise<string> {
    return await this.totalLabel.innerText();
  }

  async placeOrder(): Promise<void> {
    await this.finishButton.click();
  }
}