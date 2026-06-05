#!/usr/bin/env node
/**
 * Guards against the duplicate react-aria / react-stately tree that PR #5485 fixed.
 *
 * Background: recent @react-types/* minors invert their dependency direction. The
 * type-only packages start depending on the full @react-spectrum/* component packages,
 * which drag in @adobe/react-spectrum and a SECOND react-aria / react-stately copy.
 * That duplicate splits the i18n + overlay React contexts and breaks overlays in prod.
 * Upstream report: https://github.com/adobe/react-spectrum/issues/10139
 *
 * The fix is a set of `~` pins on @react-types/{button,checkbox,grid,table} in
 * packages/components/package.json. This script fails CI loudly if those pins ever stop
 * holding, e.g. a transitive `^` float or a Renovate bump that slips past the hold rule
 * in .github/renovate.json re-introduces @react-spectrum or a duplicate react-aria.
 *
 * Run locally: `node scripts/check-react-aria-dedupe.mjs`
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lockfile = readFileSync(resolve(root, 'pnpm-lock.yaml'), 'utf8');

const errors = [];

// 1. @adobe/react-spectrum must not be in the tree at all.
if (lockfile.includes('@adobe/react-spectrum')) {
  errors.push(
    '@adobe/react-spectrum is present in pnpm-lock.yaml — a @react-types/* package likely ' +
      'floated into an inverted version. Check the `~` pins in packages/components/package.json.'
  );
}

// 2. No @react-spectrum/* component packages should be pulled in either.
if (lockfile.includes('@react-spectrum/')) {
  errors.push(
    '@react-spectrum/* packages are present in pnpm-lock.yaml — same inverted-dependency cause as above.'
  );
}

// 3. Exactly one resolved version each of react-aria and react-stately.
const distinctVersions = pkg => {
  const matches = lockfile.matchAll(
    new RegExp(`^  ${pkg}@(\\d+\\.\\d+\\.\\d+)`, 'gm')
  );
  return [...new Set([...matches].map(m => m[1]))];
};

for (const pkg of ['react-aria', 'react-stately']) {
  const versions = distinctVersions(pkg);
  if (versions.length > 1) {
    errors.push(
      `Multiple ${pkg} versions resolved (${versions.join(', ')}) — the tree is duplicated. ` +
        'A single instance is required so the i18n + overlay contexts stay shared.'
    );
  }
}

if (errors.length > 0) {
  console.error('❌ react-aria dedupe guard failed:\n');
  for (const e of errors) console.error(`  • ${e}\n`);
  console.error(
    'See PR #5485 and the @react-types/* hold rule in .github/renovate.json.'
  );
  process.exit(1);
}

console.log(
  '✅ react-aria dedupe guard passed: single react-aria/react-stately, no @react-spectrum.'
);
