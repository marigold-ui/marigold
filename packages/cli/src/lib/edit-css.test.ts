import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { type CssEditOutcome, editCss } from './edit-css.js';

function assertEdited(
  result: CssEditOutcome
): asserts result is Extract<CssEditOutcome, { kind: 'edited' }> {
  if (result.kind !== 'edited') {
    throw new Error(`expected edited, got ${result.kind}`);
  }
}

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-css-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('editCss', () => {
  test('creates app/globals.css for a fresh Next.js project', () => {
    const result = editCss({ cwd: dir, framework: 'nextjs' });

    assertEdited(result);
    expect(result.created).toBe(true);
    expect(result.path).toBe(path.join(dir, 'app/globals.css'));

    const contents = fs.readFileSync(result.path, 'utf8');
    expect(contents).toContain(`@import 'tailwindcss';`);
    expect(contents).toContain(`@import '@marigold/theme-rui/theme.css';`);
    expect(contents).toContain(`@source '../node_modules/@marigold';`);
  });

  test('creates src/index.css for a fresh Vite project', () => {
    const result = editCss({ cwd: dir, framework: 'vite' });

    assertEdited(result);
    expect(result.path).toBe(path.join(dir, 'src/index.css'));

    const contents = fs.readFileSync(result.path, 'utf8');
    expect(contents).toContain(`@source '../node_modules/@marigold';`);
  });

  test('uses src/app path when src/app exists for Next.js', () => {
    fs.mkdirSync(path.join(dir, 'src/app'), { recursive: true });

    const result = editCss({ cwd: dir, framework: 'nextjs' });

    assertEdited(result);
    expect(result.path).toBe(path.join(dir, 'src/app/globals.css'));

    const contents = fs.readFileSync(result.path, 'utf8');
    expect(contents).toContain(`@source '../../node_modules/@marigold';`);
  });

  test('preserves existing CSS rules when patching', () => {
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

  test('returns unchanged when all imports already present', () => {
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

  test('only adds missing pieces when partially configured', () => {
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    const original = `@import 'tailwindcss';\n\nbody { margin: 0; }\n`;
    fs.writeFileSync(path.join(dir, 'app/globals.css'), original);

    const result = editCss({ cwd: dir, framework: 'nextjs' });

    assertEdited(result);
    expect(result.added).toEqual([
      'marigold theme import',
      '@source directive',
    ]);

    const contents = fs.readFileSync(path.join(dir, 'app/globals.css'), 'utf8');
    expect(contents.match(/@import 'tailwindcss'/g)?.length).toBe(1);
    expect(contents).toContain(`@import '@marigold/theme-rui/theme.css';`);
  });

  test('is idempotent across reruns', () => {
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'app/globals.css'), '');

    const first = editCss({ cwd: dir, framework: 'nextjs' });
    const second = editCss({ cwd: dir, framework: 'nextjs' });

    expect(first.kind).toBe('edited');
    expect(second.kind).toBe('unchanged');
  });
});
