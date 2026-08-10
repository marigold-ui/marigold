import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DYNAMIC_ISSUE_SOURCES } from './types.js';

// Every finding produced by the rendered pass arrives without a `location`, and
// index.ts only joins one back on for sources listed in DYNAMIC_ISSUE_SOURCES.
// A render-time checker left off that list still typechecks (the static half of
// IssueSource accepts it) and still reports — it just prints with no line number
// and without the explicit `scope: 'page'` marker, which is how
// `non-text-contrast` and `content-on-hover-focus` went unnoticed. Nothing in
// the type system catches that, so it is asserted against the source here.
const SPATIAL_DIR = fileURLToPath(new URL('./spatial', import.meta.url));

const emittedSpatialSources = (): string[] => {
  const files = fs
    .readdirSync(SPATIAL_DIR)
    .filter(f => f.endsWith('.ts') && !f.includes('.test.'));
  const sources = new Set<string>();
  for (const file of files) {
    const contents = fs.readFileSync(path.join(SPATIAL_DIR, file), 'utf8');
    for (const [, name] of contents.matchAll(/source:\s*'([a-z0-9-]+)'/g)) {
      sources.add(name);
    }
  }
  return [...sources];
};

describe('DYNAMIC_ISSUE_SOURCES', () => {
  it('covers every issue source the rendered checkers emit', () => {
    const emitted = emittedSpatialSources();

    // Guards the scan itself: a regex or path that stopped matching would make
    // the assertion below vacuously pass.
    expect(emitted.length).toBeGreaterThan(5);
    expect([...emitted].sort()).toEqual([...DYNAMIC_ISSUE_SOURCES].sort());
  });
});
