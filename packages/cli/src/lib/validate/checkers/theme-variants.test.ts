import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTechnicalChecks } from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', '__fixtures__', name);

describe('theme variant check (auto-resolve)', () => {
  it('runs by default without explicit themePath', () => {
    const result = runTechnicalChecks(fixture('invalid-variant.tsx'));
    const themeIssues = result.issues.filter(i =>
      i.message.includes('does not exist in the theme')
    );
    expect(themeIssues.length).toBeGreaterThan(0);
    expect(themeIssues[0].message).toContain('abc');
  });

  it('reports theme variant compliance when all variants are valid', () => {
    const result = runTechnicalChecks(fixture('valid-button.tsx'));
    expect(result.passed).toContain('Theme variant compliance');
  });

  it('skips theme validation when themePath is false', () => {
    const result = runTechnicalChecks(fixture('invalid-variant.tsx'), false);
    const themeIssues = result.issues.filter(i =>
      i.message.includes('does not exist in the theme')
    );
    expect(themeIssues).toEqual([]);
    expect(result.passed).not.toContain('Theme variant compliance');
  });
});
