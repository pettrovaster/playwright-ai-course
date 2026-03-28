import { Page, Locator } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}