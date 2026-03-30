import { test, expect } from '@playwright/test';
import { PlaywrightHomePage, NavItem } from '../src/pages/PlaywrightHomePage';

test.describe('TC001 — Main page navigation buttons (Refactored)', () => {
  let homePage: PlaywrightHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new PlaywrightHomePage(page);
    await homePage.goto();
  });

  // Data-driven approach for visibility checks
  const navItems: NavItem[] = ['Docs', 'API', 'Community'];

  for (const item of navItems) {
    test(`${item} navigation button is visible and accessible`, async () => {
      const link = homePage.getNavLink(item);
      // getByRole('link') already verifies the implicit ARIA role;
      // toBeVisible() confirms the element is rendered and reachable.
      await expect(link).toBeVisible();
    });
  }

  // Individual navigation tests with additional content verification
  test('Docs button navigates to the docs section', async ({ page }) => {
    await homePage.clickNavLink('Docs');
    await expect(page).toHaveURL(/\/docs\//);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('API button navigates to the API section', async ({ page }) => {
    await homePage.clickNavLink('API');
    await expect(page).toHaveURL(/\/docs\/api\//);
  });

  test('Community navigation leads to the community page', async ({ page }) => {
    await homePage.clickNavLink('Community');
    await expect(page).toHaveURL(/\/community\//);
  });
});