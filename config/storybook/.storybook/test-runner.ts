import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    // Wait for DOM to settle and any ongoing accessibility checks to complete
    // This prevents "Axe is already running" errors from the a11y addon
    await page.waitForTimeout(200);

    await checkA11y(page, '#storybook-root', {}, true, 'html');
  },
};

export default config;
