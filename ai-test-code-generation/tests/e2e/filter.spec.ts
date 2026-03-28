import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';

test('verify price sort low to high', async ({ page }) => {
  const inventoryPage: InventoryPage = new InventoryPage(page);

  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await inventoryPage.sortBy('lohi');

  const prices: number[] = await inventoryPage.getAllPrices();

  for (let i: number = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});