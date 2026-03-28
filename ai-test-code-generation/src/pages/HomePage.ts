import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly productsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        // Находим заголовок "Products" по классу
        this.productsTitle = page.locator('.title'); 
    }
}