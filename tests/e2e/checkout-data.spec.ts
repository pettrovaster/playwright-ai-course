import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { AuthHelper } from '../../src/utils/authHelper';

test.describe('Checkout with Dynamic Data and Boundary Values', () => {
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        await AuthHelper.loginAsStandardUser(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        
        await inventoryPage.manageCartItem('sauce labs backpack', 'add');
        await checkoutPage.goToCartAndCheckout();
    });

    test('should complete checkout with dynamic Faker data', async () => {
        const firstName: string = faker.name.firstName();
        const lastName: string = faker.name.lastName();
        const zipCode: string = faker.address.zipCode();

        await checkoutPage.fillInfoAndContinue(firstName, lastName, zipCode);
        await checkoutPage.finishOrder();
        
        const successMessage: string | null = await checkoutPage.getSuccessMessage();
        expect(successMessage).toBe('Thank you for your order!');
    });

    const boundaryTestData = [
        { desc: 'maximum length strings', firstName: 'A'.repeat(100), lastName: 'B'.repeat(100), zip: '1'.repeat(50) },
        { desc: 'special characters', firstName: '!@#$%^&*()', lastName: '<>?/:"{}|', zip: '±§~`' },
        { desc: 'minimum length strings', firstName: 'A', lastName: 'B', zip: '1' }
    ];

    for (const data of boundaryTestData) {
        test(`should handle boundary values: ${data.desc}`, async () => {
            await checkoutPage.fillInfoAndContinue(data.firstName, data.lastName, data.zip);
            await checkoutPage.finishOrder();
            
            const successMessage: string | null = await checkoutPage.getSuccessMessage();
            expect(successMessage).toBe('Thank you for your order!');
        });
    }
});