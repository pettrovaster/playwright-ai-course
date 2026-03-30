import { Page, Locator, expect } from '@playwright/test';

export type NavItem = 'Docs' | 'API' | 'Community';

export class PlaywrightHomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async goto(): Promise<void> {
    // Uses the baseURL defined in playwright.config.ts
    await this.page.goto('/');
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }

  /** Returns a locator for a primary navigation link by its visible label. */
  getNavLink(name: NavItem): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }

  /** Asserts the link is visible, then clicks it. */
  async clickNavLink(name: NavItem): Promise<void> {
    const link: Locator = this.getNavLink(name);
    await expect(link).toBeVisible();
    await link.click();
  }
}
