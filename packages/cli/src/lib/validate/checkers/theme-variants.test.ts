import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTechnicalChecks } from './index.js';
import { loadThemeVariants, validateThemeVariants } from './theme-variants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

let tmpSeq = 0;
// Each call gets a fresh, unique theme dir so the module-level cache (keyed on
// the resolved dir path) never serves a stale map across tests, and so
// Node's own `require` cache (keyed by resolved file path) never does either.
const makeThemeDir = (
  appearances: Record<string, Record<string, string[]>>
): string => {
  const dir = fs.mkdtempSync(
    path.join(os.tmpdir(), `tv-theme-${Date.now()}-${tmpSeq++}-`)
  );
  fs.mkdirSync(path.join(dir, 'dist'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'dist', 'appearances.cjs'),
    `exports.appearances = ${JSON.stringify(appearances)};`
  );
  return dir;
};

const tmpJsx = (content: string): string => {
  const p = path.join(os.tmpdir(), `tv-jsx-${Date.now()}-${tmpSeq++}.tsx`);
  fs.writeFileSync(p, content);
  return p;
};

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

describe('theme variant check (values sourced from dist/appearances.cjs)', () => {
  it('flags a value not present in the appearances data', () => {
    const dir = makeThemeDir({ Foo: { tone: ['a', 'b'] } });
    const jsx = tmpJsx(
      `import { Foo } from '@marigold/components';
const C = () => <Foo tone="z" />;`
    );
    const issues = validateThemeVariants(jsx, dir);
    const issue = issues.find(i =>
      i.message.includes('does not exist in the theme')
    );
    expect(issue).toBeDefined();
    expect(issue?.message).toContain('z');
  });

  it('does not flag a value present in the appearances data', () => {
    const dir = makeThemeDir({ Foo: { tone: ['a', 'b'] } });
    const jsx = tmpJsx(
      `import { Foo } from '@marigold/components';
const C = () => <Foo tone="a" />;`
    );
    const issues = validateThemeVariants(jsx, dir);
    expect(
      issues.find(i => i.message.includes('does not exist in the theme'))
    ).toBeUndefined();
  });

  it('skips a dimension with an empty value list (component has no variant of that kind)', () => {
    const dir = makeThemeDir({ Foo: { tone: [] } });
    const jsx = tmpJsx(
      `import { Foo } from '@marigold/components';
const C = () => <Foo tone="anything" />;`
    );
    const issues = validateThemeVariants(jsx, dir);
    expect(
      issues.find(i => i.message.includes('does not exist in the theme'))
    ).toBeUndefined();
  });
});

describe('theme variant loading degrades gracefully', () => {
  it('returns an empty map for a themePath that does not exist', () => {
    const missing = path.join(
      os.tmpdir(),
      `tv-missing-${Date.now()}-${tmpSeq++}`
    );
    expect(() => loadThemeVariants(missing)).not.toThrow();
    expect(loadThemeVariants(missing).size).toBe(0);
  });

  it('returns an empty map when dist/appearances.cjs does not exist (pre-appearances-build theme-rui)', () => {
    const dir = fs.mkdtempSync(
      path.join(os.tmpdir(), `tv-no-appearances-${Date.now()}-${tmpSeq++}-`)
    );
    expect(() => loadThemeVariants(dir)).not.toThrow();
    expect(loadThemeVariants(dir).size).toBe(0);
  });

  it('returns an empty map when dist/appearances.cjs is malformed', () => {
    const dir = fs.mkdtempSync(
      path.join(os.tmpdir(), `tv-malformed-${Date.now()}-${tmpSeq++}-`)
    );
    fs.mkdirSync(path.join(dir, 'dist'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'dist', 'appearances.cjs'),
      'this is not valid javascript {{{'
    );
    expect(() => loadThemeVariants(dir)).not.toThrow();
    expect(loadThemeVariants(dir).size).toBe(0);
  });
});

describe('theme variant check — origin resolution', () => {
  it('does not flag a local component that shares a themed component name', () => {
    const dir = makeThemeDir({ Foo: { tone: ['a'] } });
    const localJsx = tmpJsx(
      `import { Foo } from './my-foo';
const C = () => <Foo tone="not-a-real-tone" />;`
    );
    const issues = validateThemeVariants(localJsx, dir);
    expect(
      issues.find(i => i.message.includes('does not exist in the theme'))
    ).toBeUndefined();
  });

  it('still flags an aliased Marigold import against the theme', () => {
    const dir = makeThemeDir({ Foo: { tone: ['a'] } });
    const aliasJsx = tmpJsx(
      `import { Foo as F } from '@marigold/components';
const C = () => <F tone="z" />;`
    );
    const issues = validateThemeVariants(aliasJsx, dir);
    const issue = issues.find(i =>
      i.message.includes('does not exist in the theme')
    );
    expect(issue).toBeDefined();
    expect(issue?.component).toBe('F');
  });
});
