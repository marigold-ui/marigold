import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { editCss } from './edit-css.js';

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-css-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('editCss', () => {
  it('creates app/globals.css for a fresh Next.js project', () => {
    const result = editCss({ cwd: dir, framework: 'nextjs' });
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.created).toBe(true);
    expect(result.path).toBe(path.join(dir, 'app/globals.css'));

    const contents = fs.readFileSync(result.path, 'utf8');
    expect(contents).toContain(`@import 'tailwindcss';`);
    expect(contents).toContain(`@import '@marigold/theme-rui/theme.css';`);
    expect(contents).toContain(`@source '../node_modules/@marigold';`);
  });

  it('creates src/index.css for a fresh Vite project', () => {
    const result = editCss({ cwd: dir, framework: 'vite' });
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.path).toBe(path.join(dir, 'src/index.css'));

    const contents = fs.readFileSync(result.path, 'utf8');
    expect(contents).toContain(`@source '../node_modules/@marigold';`);
  });

  it('uses src/app path when src/app exists for Next.js', () => {
    fs.mkdirSync(path.join(dir, 'src/app'), { recursive: true });
    const result = editCss({ cwd: dir, framework: 'nextjs' });
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.path).toBe(path.join(dir, 'src/app/globals.css'));

    const contents = fs.readFileSync(result.path, 'utf8');
    expect(contents).toContain(`@source '../../node_modules/@marigold';`);
  });

  it('preserves existing CSS rules when patching', () => {
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    const original = `:root {\n  --foo: red;\n}\n\n.btn { color: blue; }\n`;
    fs.writeFileSync(path.join(dir, 'app/globals.css'), original);

    editCss({ cwd: dir, framework: 'nextjs' });
    const contents = fs.readFileSync(path.join(dir, 'app/globals.css'), 'utf8');

    expect(contents).toContain(':root {');
    expect(contents).toContain('--foo: red;');
    expect(contents).toContain('.btn { color: blue; }');
    expect(contents.indexOf(`@import 'tailwindcss';`)).toBeLessThan(
      contents.indexOf(':root')
    );
  });

  it('returns unchanged when all imports already present', () => {
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    const original = [
      `@import 'tailwindcss';`,
      `@import '@marigold/theme-rui/theme.css';`,
      `@source '../node_modules/@marigold';`,
      ``,
      `body { margin: 0; }`,
    ].join('\n');
    fs.writeFileSync(path.join(dir, 'app/globals.css'), original);

    const result = editCss({ cwd: dir, framework: 'nextjs' });
    expect(result.kind).toBe('unchanged');
  });

  it('only adds missing pieces when partially configured', () => {
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    const original = `@import 'tailwindcss';\n\nbody { margin: 0; }\n`;
    fs.writeFileSync(path.join(dir, 'app/globals.css'), original);

    const result = editCss({ cwd: dir, framework: 'nextjs' });
    expect(result.kind).toBe('edited');
    if (result.kind !== 'edited') return;
    expect(result.added).toEqual([
      'marigold theme import',
      '@source directive',
    ]);

    const contents = fs.readFileSync(path.join(dir, 'app/globals.css'), 'utf8');
    // tailwind import should still exist exactly once
    expect(contents.match(/@import 'tailwindcss'/g)?.length).toBe(1);
    expect(contents).toContain(`@import '@marigold/theme-rui/theme.css';`);
  });

  it('is idempotent across reruns', () => {
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'app/globals.css'), '');

    const first = editCss({ cwd: dir, framework: 'nextjs' });
    expect(first.kind).toBe('edited');

    const second = editCss({ cwd: dir, framework: 'nextjs' });
    expect(second.kind).toBe('unchanged');
  });
});
