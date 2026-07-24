import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Shared tmp-file helper for tests. Every write lands under a single per-process
// base dir created once via mkdtempSync, so a fixed logical name (e.g.
// "card.tsx") can never collide across parallel vitest workers or overlapping
// runs, and the whole tree sits under one OS-reapable directory instead of
// scattering fixed-name files across os.tmpdir(). Nested names are supported.
let baseDir: string | undefined;

const getBaseDir = (): string => {
  if (!baseDir) baseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mv-test-'));
  return baseDir;
};

export const tmpFile = (name: string, content: string): string => {
  const p = path.join(getBaseDir(), name);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  return p;
};
