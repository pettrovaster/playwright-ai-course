import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { AuthHelper } from '../../src/utils/authHelper';

test.describe('Inventory Tests', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        await AuthHelper.loginAsStandardUser(page);
        inventoryPage = new InventoryPage(page);
    });

    test('should add a single item to the cart', async () => {
        await inventoryPage.manageCartItem('sauce labs backpack', 'add');
        const count: number = await inventoryPage.getCartItemCount();
        expect(count).toBe(1);
    });

    test('should add multiple items to the cart', async () => {
        await inventoryPage.manageCartItem('sauce labs backpack', 'add');
        await inventoryPage.manageCartItem('sauce labs bike light', 'add');
        const count: number = await inventoryPage.getCartItemCount();
        expect(count).toBe(2);
    });

    test('should remove an item from the cart', async () => {
        await inventoryPage.manageCartItem('sauce labs backpack', 'add');
        await inventoryPage.manageCartItem('sauce labs backpack', 'remove');
        const count: number = await inventoryPage.getCartItemCount();
        expect(count).toBe(0);
    });
});