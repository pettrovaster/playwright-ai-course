import { test, expect } from '@playwright/test';
import { Header } from '../../src/components/Header';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { AuthPage } from '../../src/pages/AuthPage';
import { checkoutData, testData } from '../../src/fixtures/testData';

test('verify full checkout flow with correct totals', async ({ page }) => {
  const authPage = new AuthPage(page);
  const header = new Header(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await authPage.open();
  await authPage.login(testData.validUser.username, testData.validUser.password);

  await inventoryPage.addToCart('add-to-cart-sauce-labs-fleece-jacket');
  await expect(header.cartBadge).toHaveText('1');

  await header.openCart();
  await cartPage.proceedToCheckout();

  await page.getByTestId('firstName').fill(checkoutData.firstName);
  await page.getByTestId('lastName').fill(checkoutData.lastName);
  await page.getByTestId('postalCode').fill(checkoutData.postalCode);
  await page.getByTestId('continue').click();

  const total = await checkoutPage.getTotal();
  expect(total).toContain(checkoutData.expectedTotal);

  await checkoutPage.placeOrder();
});