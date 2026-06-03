import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTechnicalChecks } from './index.js';
import { validateThemeVariants } from './theme-variants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

let tmpSeq = 0;
// Each call gets a fresh, unique theme dir so the module-level cache (keyed on
// the resolved dir path) never serves a stale map across tests.
const makeThemeDir = (): string => {
  const dir = fs.mkdtempSync(
    path.join(os.tmpdir(), `tv-theme-${Date.now()}-${tmpSeq++}-`)
  );
  fs.mkdirSync(path.join(dir, 'src', 'components'), { recursive: true });
  return dir;
};

const writeStyle = (dir: string, name: string, content: string): void => {
  fs.writeFileSync(path.join(dir, 'src', 'components', name), content);
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

describe('theme variant check (object-of-cva FP guard, finding #5B)', () => {
  it('does not flag an internal style group key as a JSX prop', () => {
    const dir = makeThemeDir();
    writeStyle(
      dir,
      'Menu.styles.ts',
      `import { cva } from 'class-variance-authority';
export const Menu = {
  item: cva({ variants: { variant: { default: '', destructive: '' } } }),
};`
    );
    const jsx = tmpJsx(
      `import { Menu } from '@marigold/components';
const C = () => <Menu variant="ghost" />;`
    );
    const issues = validateThemeVariants(jsx, dir);
    const themeIssue = issues.find(i =>
      i.message.includes('does not exist in the theme')
    );
    expect(themeIssue).toBeUndefined();
  });
});

describe('theme variant check (compoundVariants union, finding #5A)', () => {
  it('accepts a value that only appears in compoundVariants', () => {
    const dir = makeThemeDir();
    writeStyle(
      dir,
      'Foo.styles.ts',
      `import { cva } from 'class-variance-authority';
export const Foo = cva({
  variants: { tone: { a: '' } },
  compoundVariants: [{ tone: 'b', class: 'x' }],
});`
    );
    const okJsx = tmpJsx(
      `import { Foo } from '@marigold/components';
const C = () => <Foo tone="b" />;`
    );
    const okIssues = validateThemeVariants(okJsx, dir);
    expect(
      okIssues.find(i => i.message.includes('does not exist in the theme'))
    ).toBeUndefined();
  });

  it('still flags a value that is in neither variants nor compoundVariants', () => {
    const dir = makeThemeDir();
    writeStyle(
      dir,
      'Foo.styles.ts',
      `import { cva } from 'class-variance-authority';
export const Foo = cva({
  variants: { tone: { a: '' } },
  compoundVariants: [{ tone: 'b', class: 'x' }],
});`
    );
    const badJsx = tmpJsx(
      `import { Foo } from '@marigold/components';
const C = () => <Foo tone="z" />;`
    );
    const badIssues = validateThemeVariants(badJsx, dir);
    const issue = badIssues.find(i =>
      i.message.includes('does not exist in the theme')
    );
    expect(issue).toBeDefined();
    expect(issue?.message).toContain('z');
  });
});
