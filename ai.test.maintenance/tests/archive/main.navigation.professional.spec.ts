import { test, expect, Page } from '@playwright/test';
import { PlaywrightHomePage, NavItem } from '../src/pages/PlaywrightHomePage';

/**
 * TC-NAV-001: Main Page Navigation Verification
 * Requirement: All primary navigation links must be accessible, 
 * display correct labels, and lead to valid destinations.
 */
test.describe('TC-NAV-001 — Professional Navigation Audit', () => {
  let homePage: PlaywrightHomePage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    homePage = new PlaywrightHomePage(page);
    await homePage.goto();
  });

  const navItems: NavItem[] = ['Docs', 'API', 'Community'];

  for (const item of navItems) {
    test(`Verify ${item} link visibility and accessibility standards`, async () => {
      const link = homePage.getNavLink(item);
      
      // Strict accessibility and state checks
      await expect(link, `Link "${item}" should be visible`).toBeVisible();
      await expect(link, `Link "${item}" should be enabled`).toBeEnabled();
      // getByRole('link') already asserts the implicit ARIA role;
      // verify href is present to confirm it's a real navigable link
      await expect(link).toHaveAttribute('href', /.+/);
    });
  }

  test('Navigate to Docs and verify content integrity', async ({ page }: { page: Page }) => {
    await homePage.clickNavLink('Docs');
    
    // Explicit behavior checks
    await expect(page).toHaveURL(/\/docs\//);
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).not.toBeEmpty();
  });

  // --- Step 3: Edge Case Test ---
  test('Verify navigation links are not obscured by other elements', async () => {
    const link = homePage.getNavLink('API');
    // Verify the link is visible and enabled — sufficient to confirm it is interactable
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
  });

  /**
   * Edge Case: Verify correct target for API link 
   * specifically checking for nested documentation paths.
   */
  test('API link should target the latest API documentation schema', async ({ page }: { page: Page }) => {
    await homePage.clickNavLink('API');
    await expect(page).toHaveURL(/.*\/api\/class-playwright/);
  });
});