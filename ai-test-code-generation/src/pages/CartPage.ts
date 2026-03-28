import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('inventory-item');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}