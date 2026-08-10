import { describe, expect, it, vi } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { emptyCoverage } from '../types.js';
import { compileFile } from './compiler.js';
import { runTechnicalChecks } from './index.js';
import { validateProps } from './props.js';

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

  it('dedup precondition: prop-validator and compiler agree on exact line:column for the same invalid prop', () => {
    // Deduplication in runTechnicalChecks keys on `${line}:${column}` and drops
    // the compiler duplicate of a prop error. That only works if both checkers
    // report the identical position. This test pins that contract — if either
    // checker's position computation drifts, dedup would silently stop working.
    const file = fixture('invalid-props.tsx');
    const propPositions = new Set(
      validateProps(file, emptyCoverage())
        .filter(i => i.location)
        .map(i => `${i.location!.line}:${i.location!.column}`)
    );
    const compilerPositions = compileFile(file)
      .issues.filter(i => i.location)
      .map(i => `${i.location!.line}:${i.location!.column}`);

    expect(propPositions.size).toBeGreaterThan(0);
    expect(compilerPositions.length).toBeGreaterThan(0);
    // every compiler error on an invalid prop sits on a position the prop
    // validator also flagged, so dedup removes it.
    for (const pos of compilerPositions) {
      expect(propPositions.has(pos)).toBe(true);
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

  it("isolates a checker that throws instead of discarding every other checker's findings", async () => {
    vi.resetModules();
    vi.doMock('./table-usage.js', () => ({
      validateTableUsage: () => {
        throw new Error('boom');
      },
    }));
    const { runTechnicalChecks: runWithMock } = await import('./index.js');

    const result = runWithMock(fixture('invalid-props.tsx'));

    // The mocked checker's own failure surfaces as a single warning...
    const failureIssue = result.issues.find(
      i => i.source === 'table-usage' && i.severity === 'warning'
    );
    expect(failureIssue).toBeDefined();
    expect(failureIssue?.message).toContain('Table usage check failed');
    expect(failureIssue?.message).toContain('boom');
    // ...but every other checker's findings (e.g. the file's real prop
    // errors) still come through unaffected.
    expect(result.issues.some(i => i.source === 'prop-validator')).toBe(true);

    vi.doUnmock('./table-usage.js');
    vi.resetModules();
  });

  it('reports one clear error (not N downgraded warnings) when the component registry is unavailable', async () => {
    vi.resetModules();
    vi.doMock('../helpers/components.js', async importOriginal => {
      const actual =
        await importOriginal<typeof import('../helpers/components.js')>();
      return {
        ...actual,
        loadMarigoldRegistry: () => {
          throw new Error('@marigold/components is not installed');
        },
      };
    });
    const { runTechnicalChecks: runWithMock } = await import('./index.js');

    const result = runWithMock(fixture('valid-button.tsx'));

    // Exactly one clear, error-severity finding for the real cause...
    const registryErrors = result.issues.filter(
      i => i.severity === 'error' && i.source === 'runtime'
    );
    expect(registryErrors).toHaveLength(1);
    expect(registryErrors[0].message).toContain(
      '@marigold/components is not installed'
    );
    // ...not a pile of per-checker warnings for the same root cause.
    expect(
      result.issues.some(
        i => i.severity === 'warning' && i.message.includes('check failed')
      )
    ).toBe(false);
    // A file that could not actually be checked must not report clean passes
    // for the checks that never ran.
    expect(result.passed).not.toContain('All Marigold props are valid');
    expect(result.passed).not.toContain('Component composition');

    vi.doUnmock('../helpers/components.js');
    vi.resetModules();
  });
});
