import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly cartLink: Locator;
    private readonly checkoutButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.checkoutButton = page.getByTestId('checkout');
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.zipCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
        this.completeHeader = page.getByTestId('complete-header');
    }

    public async goToCartAndCheckout(): Promise<void> {
        await this.cartLink.click();
        await this.checkoutButton.click();
    }

    public async fillInfoAndContinue(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    public async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }

    public async getSuccessMessage(): Promise<string | null> {
        return await this.completeHeader.textContent();
    }
}