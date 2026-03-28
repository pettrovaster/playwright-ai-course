import { Page, Locator } from '@playwright/test';

export class AuthPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;
    readonly errorMessageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.submitBtn = page.getByTestId('login-button');
        this.errorMessageText = page.getByTestId('error');
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async login(user: string, pass: string): Promise<void> {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.submitBtn.click();
    }
}