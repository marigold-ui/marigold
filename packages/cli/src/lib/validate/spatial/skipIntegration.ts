import ci from 'ci-info';
import type { TestContext } from 'vitest';
import type { ValidationIssue, ValidationReport } from '../types.js';

/**
 * Skips an integration test when this machine lacks what it needs (a working
 * Chromium render, a free port). The CI `cli-tests` job installs Chromium, so
 * a missing renderer there is a broken environment, not a reason to skip: with
 * `inCI: 'fail'` the test fails in CI instead of passing silently. Pass the
 * probe's error as `cause` so the failure shows why the render did not work.
 */
export const skipIntegration = (
  ctx: TestContext,
  reason: string,
  { inCI, cause }: { inCI: 'fail' | 'skip'; cause?: unknown }
): never => {
  if (inCI === 'fail' && ci.isCI) {
    throw new Error(
      `${reason}. CI provides it, so this fails instead of skipping.`,
      { cause }
    );
  }
  return ctx.skip(reason);
};

/**
 * `validate()` does not throw when the render fails. It reports a `Renderer`
 * issue instead (an error, or a warning when the render toolchain is missing).
 * Returns that issue, so a probe can pass it to `skipIntegration` as `cause`.
 */
export const probeFailureCause = (
  report: ValidationReport
): ValidationIssue | undefined =>
  [...report.errors, ...report.warnings].find(i => i.component === 'Renderer');
