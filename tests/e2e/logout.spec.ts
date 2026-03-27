import { test, expect, Locator } from '@playwright/test';
import { SidebarPage } from '../../src/pages/SidebarPage';
import { AuthHelper } from '../../src/utils/authHelper';

test.describe('Logout Tests', () => {
    let sidebarPage: SidebarPage;

    test.beforeEach(async ({ page }) => {
        await AuthHelper.loginAsStandardUser(page);
        sidebarPage = new SidebarPage(page);
    });

    test('should logout successfully and redirect to login page', async ({ page }) => {
        await sidebarPage.openMenu();
        await sidebarPage.logout();
        
        const loginButton: Locator = page.getByTestId('login-button');
        await expect(loginButton).toBeVisible();
        await expect(page).toHaveURL(/.*saucedemo.com/);
    });
});