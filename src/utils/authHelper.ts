import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class AuthHelper {
    public static async loginAsStandardUser(page: Page): Promise<void> {
        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.navigateTo('/');
        await loginPage.login('standard_user', 'secret_sauce');
    }
}