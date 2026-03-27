// path: src/pages/BasePage.ts
import { Page } from '@playwright/test';
import { Logger } from '../utils/logger.ts';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateTo(path: string): Promise<void> {
        Logger.info(`Navigating to: ${path}`);
        await this.page.goto(path);
    }

    public async waitForUrl(url: string | RegExp): Promise<void> {
        await this.page.waitForURL(url);
    }
}