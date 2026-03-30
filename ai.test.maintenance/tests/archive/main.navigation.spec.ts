import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../../src/pages/PlaywrightHomePage';

test.describe('Main page navigation buttons', () => {
  let homePage: PlaywrightHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new PlaywrightHomePage(page);
    await homePage.goto();
  });

  test('Docs navigation button is visible', async ({ page }) => {
    // Degradation: added a fixed wait instead of a smart assertion
    await page.waitForTimeout(2000); 
    await expect(homePage.docsNavLink).toBeVisible();
  });

  test('Docs button navigates to the docs section', async ({ page }) => {
    await homePage.clickDocs();
    // Manual validation added here
    const header = page.locator('h1');
    await expect(header).toContainText('Installation');
    await expect(page).toHaveURL(/\/docs\//);
  });

  // Other tests remain but are now at risk due to the brittle POM
  test('API navigation button is visible', async () => {
    await expect(homePage.apiNavLink).toBeVisible();
  });
});