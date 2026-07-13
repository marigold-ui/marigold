import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpFile } from '../test-support/tmp.js';
import { compileFile } from './compiler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

describe('compileFile', () => {
  it('returns ok=true and no issues for a valid fixture', () => {
    const result = compileFile(fixture('valid-button.tsx'));
    expect(result.ok).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('returns ok=false and structured issues for invalid props', () => {
    const result = compileFile(fixture('invalid-props.tsx'));
    expect(result.ok).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
    for (const issue of result.issues) {
      expect(issue.type).toBe('technical');
      expect(issue.severity).toBe('error');
      expect(typeof issue.message).toBe('string');
      expect(typeof issue.suggestion).toBe('string');
      expect(issue.location?.line).toBeGreaterThan(0);
    }
  });

  it('catches errors even when @ts-nocheck is present', () => {
    const file = tmpFile(
      'cv-ts-nocheck.tsx',
      `// @ts-nocheck
const x: number = "not a number";
export default x;`
    );
    const result = compileFile(file);
    expect(result.ok).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('catches errors even when @ts-ignore is present', () => {
    const file = tmpFile(
      'cv-ts-ignore.tsx',
      `// @ts-ignore
const x: number = "not a number";
export default x;`
    );
    const result = compileFile(file);
    expect(result.ok).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('catches errors even when @ts-expect-error is present', () => {
    const file = tmpFile(
      'cv-ts-expect-error.tsx',
      `// @ts-expect-error
const x: number = "not a number";
export default x;`
    );
    const result = compileFile(file);
    expect(result.ok).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('catches syntax errors', () => {
    const file = tmpFile('cv-syntax-error.tsx', `const broken = (`);
    const result = compileFile(file);
    expect(result.ok).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('returns ok=true for a non-existent file (empty = valid)', () => {
    const result = compileFile('/non/existent/file.tsx');
    expect(result.ok).toBe(true);
    expect(result.issues).toHaveLength(0);
  });
});
