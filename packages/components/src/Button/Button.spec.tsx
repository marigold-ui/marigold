import { test, expect } from '@playwright/test';
import {
  test as cttest,
  expect as ctexpect,
} from '@playwright/experimental-ct-react';
import { Button } from './Button';

test('example test', async ({ page }) => {
  await page.goto(
    'http://localhost:1337/?path=/story/components-button--basic&globals=theme:stacked'
  ); // The baseURL here is the webServer URL
  await expect(page).toHaveScreenshot();
});

cttest('render props', async ({ mount }) => {
  const component = await mount(<Button variant="primary">Submit</Button>);
  await ctexpect(component).toContainText('Submit');
});
