import { test, expect } from '@playwright/test';
import { PlaywrightHomePage, NavItem } from '../src/pages/PlaywrightHomePage';

/**
 * TC-NAV-001: Main Page Navigation Verification
 *
 * Requirement: All primary navigation links (Docs, API, Community) must be
 * visible, accessible, and navigate to their correct destinations.
 *
 * Reference: tests/manual/TC001-main-page-navigation-buttons.md
 */
test.describe('TC-NAV-001 — Main page navigation', () => {
  let homePage: PlaywrightHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new PlaywrightHomePage(page);
    await homePage.goto();
  });

  // ── Block 1: Visibility & Accessibility ──────────────────────────────────
  // Data-driven loop covers TC001 steps 3–5 (one test per nav item).

  const navItems: NavItem[] = ['Docs', 'API', 'Community'];

  for (const item of navItems) {
    test(`"${item}" link is visible, enabled, and has a valid href`, async () => {
      const link = homePage.getNavLink(item);

      await expect(link).toBeVisible();
      await expect(link).toBeEnabled();
      // Confirm the element carries a destination URL (not a placeholder)
      await expect(link).toHaveAttribute('href', /.+/);
    });
  }

  // ── Block 2: Navigation — Docs ────────────────────────────────────────────
  // Covers TC001 steps 6–7.

  test('"Docs" link navigates to the docs section', async ({ page }) => {
    await homePage.clickNavLink('Docs');

    await expect(page).toHaveURL(/\/docs\//);
    // Verify the destination page has meaningful content
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).not.toBeEmpty();
  });

  // ── Block 3: Navigation — API ─────────────────────────────────────────────
  // Covers TC001 steps 8–9.

  test('"API" link navigates to the API reference', async ({ page }) => {
    await homePage.clickNavLink('API');

    await expect(page).toHaveURL(/\/docs\/api\//);
  });

  // ── Block 4: Navigation — Community ──────────────────────────────────────
  // Covers TC001 step 10.

  test('"Community" link navigates to the community section', async ({ page }) => {
    await homePage.clickNavLink('Community');

    await expect(page).toHaveURL(/\/community\//);
  });
});
