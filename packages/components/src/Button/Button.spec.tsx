import { test, expect } from '@playwright/test';
import {
  test as cttest,
  expect as ctexpect,
} from '@playwright/experimental-ct-react';
import { Button } from './Button';

// visual test
test('test if story matches screenshot', async ({ page }) => {
  await page.goto(
    'iframe.html?globals=theme:stacked&args=&id=components-button--basic&viewMode=story'
  );

  const button = page.getByText('Click me');

  await expect(button.first()).toHaveScreenshot({
    maxDiffPixelRatio: 0.2,
  });
  await expect(button.nth(1)).toHaveScreenshot({
    maxDiffPixelRatio: 0.2,
  });
  await expect(button.last()).toHaveScreenshot({
    maxDiffPixelRatio: 0.2,
  });
});

// component test
cttest('render props', async ({ mount }) => {
  const component = await mount(<Button variant="primary">Submit</Button>);
  await ctexpect(component).toContainText('Submit');
});
