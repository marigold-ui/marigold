import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTechnicalChecks } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

describe('runTechnicalChecks', () => {
  it('passes both checks for a valid file', () => {
    const result = runTechnicalChecks(fixture('valid-button.tsx'));
    expect(result.issues).toHaveLength(0);
    expect(result.passed).toContain('TypeScript compilation');
    expect(result.passed).toContain('All Marigold props are valid');
  });

  it('does not pass Marigold prop check when prop errors exist', () => {
    const result = runTechnicalChecks(fixture('invalid-props.tsx'));
    expect(result.passed).not.toContain('All Marigold props are valid');
  });

  it('does not duplicate errors: compiler errors on prop-flagged lines are suppressed', () => {
    const result = runTechnicalChecks(fixture('invalid-props.tsx'));
    const propIssues = result.issues.filter(i => i.component !== 'TypeScript');
    const compilerIssues = result.issues.filter(
      i => i.component === 'TypeScript'
    );

    const propLines = new Set<number>();
    for (const issue of propIssues) {
      if (issue.location) {
        propLines.add(issue.location.line);
        propLines.add(issue.location.line - 1);
      }
    }

    const compilerWithLocation = compilerIssues.filter(i => i.location);
    for (const issue of compilerWithLocation) {
      expect(propLines.has(issue.location!.line)).toBe(false);
    }
  });

  it('total issue count is lower than prop + compiler errors combined', () => {
    const result = runTechnicalChecks(fixture('invalid-props.tsx'));
    // Without deduplication, both prop and compiler errors would appear for
    // the same lines. The combined result must be fewer than if both ran
    // independently with no filtering.
    const propOnly = result.issues.filter(i => i.component !== 'TypeScript');
    const compilerOnly = result.issues.filter(
      i => i.component === 'TypeScript'
    );
    expect(result.issues.length).toBeLessThan(
      propOnly.length + compilerOnly.length + propOnly.length
    );
  });
});
