import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { detectProject, installCommand } from './detect-project.js';

const makeTmpDir = () =>
  fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-detect-'));

describe('detectProject', () => {
  it('detects Next.js + pnpm', () => {
    const dir = makeTmpDir();
    fs.writeFileSync(path.join(dir, 'next.config.mjs'), '');
    fs.writeFileSync(path.join(dir, 'pnpm-lock.yaml'), '');
    const info = detectProject(dir);
    expect(info.framework).toBe('nextjs');
    expect(info.packageManager).toBe('pnpm');
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('detects Vite + npm', () => {
    const dir = makeTmpDir();
    fs.writeFileSync(path.join(dir, 'vite.config.ts'), '');
    const info = detectProject(dir);
    expect(info.framework).toBe('vite');
    expect(info.packageManager).toBe('npm');
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('returns unknown framework when no markers found', () => {
    const dir = makeTmpDir();
    const info = detectProject(dir);
    expect(info.framework).toBe('unknown');
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('detects Tailwind v4 from CSS import', () => {
    const dir = makeTmpDir();
    fs.mkdirSync(path.join(dir, 'app'));
    fs.writeFileSync(
      path.join(dir, 'app/globals.css'),
      `@import "tailwindcss";\n`
    );
    const info = detectProject(dir);
    expect(info.tailwindVersion).toBe(4);
    fs.rmSync(dir, { recursive: true, force: true });
  });
});

describe('installCommand', () => {
  it('builds pnpm command', () => {
    expect(installCommand('pnpm', ['@marigold/components'])).toEqual([
      'pnpm',
      'add',
      '@marigold/components',
    ]);
  });
  it('builds npm command', () => {
    expect(installCommand('npm', ['a', 'b'])).toEqual([
      'npm',
      'install',
      'a',
      'b',
    ]);
  });
  it('builds yarn command', () => {
    expect(installCommand('yarn', ['x'])).toEqual(['yarn', 'add', 'x']);
  });
});
