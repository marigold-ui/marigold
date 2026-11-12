import type { TestContext } from 'vitest';

/**
 * Skips an integration test when this machine lacks what it needs (a working
 * Chromium render, a free port). The CI `cli-tests` job installs Chromium, so
 * a missing renderer there is a broken environment, not a reason to skip: with
 * `inCI: 'fail'` the test fails in CI instead of passing silently.
 */
export const skipIntegration = (
  ctx: TestContext,
  reason: string,
  { inCI }: { inCI: 'fail' | 'skip' }
): never => {
  if (inCI === 'fail' && process.env.CI) {
    throw new Error(
      `${reason}. CI provides it, so this fails instead of skipping.`
    );
  }
  return ctx.skip(reason);
};
