import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SidebarPage extends BasePage {
    private readonly menuButton: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByTestId('logout-sidebar-link');
    }

    public async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    public async logout(): Promise<void> {
        await this.logoutLink.click();
    }
}