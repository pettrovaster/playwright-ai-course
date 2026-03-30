import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../../src/pages/PlaywrightHomePage';
import { InstallationPage } from '../../src/pages/InstallationPage';

test.describe('Playwright website', () => {
  let homePage: PlaywrightHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new PlaywrightHomePage(page);
    await homePage.goto();
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link navigates to installation page', async ({ page }) => {
    const installationPage = new InstallationPage(page);

    await homePage.clickGetStarted();

    await expect(installationPage.installationHeading).toBeVisible();
  });
});

