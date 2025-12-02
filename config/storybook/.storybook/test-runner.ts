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
    // Ensure all animations and async operations have completed
    // Wait for network to be idle (no ongoing requests for 500ms)
    try {
      await page.waitForLoadState('networkidle', { timeout: 2000 });
    } catch {
      // Continue if timeout - page might not have any network activity
    }

    // Additional small delay to ensure any transitions/animations complete
    await page.waitForTimeout(100);

    await checkA11y(page, '#storybook-root', {}, true, 'html');
  },
};

export default config;
