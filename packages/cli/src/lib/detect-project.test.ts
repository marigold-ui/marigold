import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { detectProject, installCommand } from './detect-project.js';

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-detect-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('detectProject', () => {
  test('detects Next.js + pnpm', () => {
    fs.writeFileSync(path.join(dir, 'next.config.mjs'), '');
    fs.writeFileSync(path.join(dir, 'pnpm-lock.yaml'), '');

    const info = detectProject(dir);

    expect(info.framework).toBe('nextjs');
    expect(info.packageManager).toBe('pnpm');
  });

  test('detects Vite + npm', () => {
    fs.writeFileSync(path.join(dir, 'vite.config.ts'), '');

    const info = detectProject(dir);

    expect(info.framework).toBe('vite');
    expect(info.packageManager).toBe('npm');
  });

  test('returns unknown framework when no markers found', () => {
    const info = detectProject(dir);

    expect(info.framework).toBe('unknown');
  });

  test('detects Tailwind v4 from CSS import', () => {
    fs.mkdirSync(path.join(dir, 'app'));
    fs.writeFileSync(
      path.join(dir, 'app/globals.css'),
      `@import "tailwindcss";\n`
    );

    const info = detectProject(dir);

    expect(info.tailwindVersion).toBe(4);
  });
});

describe('installCommand', () => {
  test('builds pnpm command', () => {
    expect(installCommand('pnpm', ['@marigold/components'])).toEqual([
      'pnpm',
      'add',
      '@marigold/components',
    ]);
  });

  test('builds npm command', () => {
    expect(installCommand('npm', ['a', 'b'])).toEqual([
      'npm',
      'install',
      'a',
      'b',
    ]);
  });

  test('builds yarn command', () => {
    expect(installCommand('yarn', ['x'])).toEqual(['yarn', 'add', 'x']);
  });
});
