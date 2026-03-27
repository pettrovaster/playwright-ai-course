import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    private readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    }

    public async manageCartItem(itemName: string, action: 'add' | 'remove'): Promise<void> {
        const formattedName: string = itemName.toLowerCase().replace(/ /g, '-');
        const testId: string = action === 'add' ? `add-to-cart-${formattedName}` : `remove-${formattedName}`;
        const button: Locator = this.page.getByTestId(testId);
        await button.click();
    }

    public async getCartItemCount(): Promise<number> {
        const isVisible: boolean = await this.shoppingCartBadge.isVisible();
        if (!isVisible) {
            return 0;
        }
        const text: string | null = await this.shoppingCartBadge.textContent();
        return text ? parseInt(text, 10) : 0;
    }
}