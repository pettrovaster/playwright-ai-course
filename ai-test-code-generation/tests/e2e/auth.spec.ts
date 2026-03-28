import { test, expect } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import { testData } from '../../src/fixtures/testData';

test.describe('Auth Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);
        await authPage.open();
    });

    test('Successful login', async () => {
        await authPage.login(testData.validUser.username, testData.validUser.password);
        await expect(homePage.productsTitle).toBeVisible();
    });

    test('Invalid login', async () => {
        await authPage.login(testData.invalidUser.username, testData.invalidUser.password);
        await expect(authPage.errorMessageText).toBeVisible();
    });
});