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
    // Cancel any ongoing Axe checks to prevent conflicts
    await page.evaluate(() => {
      if (typeof window.axe !== 'undefined') {
        // Reset Axe state by removing and re-injecting
        delete (window as any).axe;
      }
    });

    // Re-inject Axe to ensure clean state
    await injectAxe(page);

    await checkA11y(page, '#storybook-root', {}, true, 'html');
  },
};

export default config;
