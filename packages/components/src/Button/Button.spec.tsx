import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto(
    'http://localhost:1337/iframe.html?globals=theme:stacked&id=components-button--basic&viewMode=story'
  ); // The baseURL here is the webServer URL
  await expect(page).toHaveScreenshot();
});
