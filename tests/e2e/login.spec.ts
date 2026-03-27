import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo('/');
    });

    test('should login successfully with standard user', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('should show error for locked out user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        const errorText = page.getByTestId('error');
        await expect(errorText).toBeVisible();
        await expect(errorText).toContainText('Sorry, this user has been locked out.');
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await loginPage.login('standard_user', 'wrong_password');
        const errorText = page.getByTestId('error');
        await expect(errorText).toBeVisible();
        await expect(errorText).toContainText('Username and password do not match');
    });

    test('should show error when username is empty', async ({ page }) => {
        await loginPage.login('', 'secret_sauce');
        const errorText = page.getByTestId('error');
        await expect(errorText).toBeVisible();
        await expect(errorText).toContainText('Username is required');
    });
});