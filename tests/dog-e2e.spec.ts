import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost:5173';

test('E2E: dog image loads when page opens', async ({ page }) => {

  await page.goto(APP_URL);

  await page.waitForResponse('**/api/dogs/random');

  const image = page.locator('img');

  await expect(image).toHaveAttribute('src', /^https:\/\//);

});

test('E2E: dog image loads after button click', async ({ page }) => {

  await page.goto(APP_URL);

  const button = page.getByRole('button');

  await button.click();

  await page.waitForResponse('**/api/dogs/random');

  const image = page.locator('img');

  await expect(image).toHaveAttribute('src', /^https:\/\//);

});

test('E2E: error message visible when API fails', async ({ page }) => {

  await page.route('**/api/dogs/random', route => route.abort());

  await page.goto(APP_URL);

  const errorElement = page.getByText(/error/i);

  await expect(errorElement).toBeVisible();

});