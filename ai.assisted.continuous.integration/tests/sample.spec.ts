import { test, expect } from '@playwright/test';
import { HomePage } from '../src/Pages/HomePage';
import { FormFieldsPage } from '../src/Pages/FormFieldsPage';

test.describe('CI/CD Training Suite', () => {
  let homePage: HomePage;
  let formFieldsPage: FormFieldsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    formFieldsPage = new FormFieldsPage(page);
  });

  test('should navigate to form fields page', async ({ page }) => {
    await homePage.goto();
    await homePage.clickFormFields();
    
    await expect(page).toHaveURL(/.*form-fields/);
    await expect(formFieldsPage.heading).toBeVisible();
  });

  test('should fail to verify artifact upload', async () => {
    await formFieldsPage.goto();
    
    await expect(formFieldsPage.heading).toBeVisible();
    await expect(formFieldsPage.heading).toHaveText('Intentional Failure Text');
  });
});