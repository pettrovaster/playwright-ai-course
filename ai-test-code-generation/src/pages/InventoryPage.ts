import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

  async addToCart(itemId: string): Promise<void> {
    await this.page.getByTestId(itemId).click();
  }

  async getPrice(itemPriceId: string): Promise<string> {
    return await this.page.getByTestId(itemPriceId).innerText();
  }

  async sortBy(optionValue: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllPrices(): Promise<number[]> {
    const priceTexts: string[] = await this.itemPrices.allInnerTexts();
    return priceTexts.map((text: string) => parseFloat(text.replace('$', '')));
  }
}