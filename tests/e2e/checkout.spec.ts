import { test, expect, Locator } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { AuthHelper } from '../../src/utils/authHelper';

test.describe('Checkout Tests', () => {
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        await AuthHelper.loginAsStandardUser(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        
        await inventoryPage.manageCartItem('sauce labs backpack', 'add');
    });

    test('should complete checkout successfully', async () => {
        await checkoutPage.goToCartAndCheckout();
        await checkoutPage.fillInfoAndContinue('John', 'Doe', '12345');
        await checkoutPage.finishOrder();
        
        const successMessage: string | null = await checkoutPage.getSuccessMessage();
        expect(successMessage).toBe('Thank you for your order!');
    });

    test('should not continue checkout with empty first name', async ({ page }) => {
        await checkoutPage.goToCartAndCheckout();
        await checkoutPage.fillInfoAndContinue('', 'Doe', '12345');
        
        const errorLocator: Locator = page.getByTestId('error');
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toContainText('First Name is required');
    });

    test('should not continue checkout with empty postal code', async ({ page }) => {
        await checkoutPage.goToCartAndCheckout();
        await checkoutPage.fillInfoAndContinue('John', 'Doe', '');
        
        const errorLocator: Locator = page.getByTestId('error');
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toContainText('Postal Code is required');
    });
    
    test('should cancel checkout and return to cart', async ({ page }) => {
        await checkoutPage.goToCartAndCheckout();
        const cancelButton: Locator = page.getByTestId('cancel');
        await cancelButton.click();
        
        await expect(page).toHaveURL(/.*cart.html/);
    });
});