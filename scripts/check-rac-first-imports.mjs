#!/usr/bin/env node
/**
 * Guards the RAC-first import rule inside `packages/components`.
 *
 * The rule: when `react-aria-components` re-exports an API, take it from there — never from
 * the `@react-aria/*` shell it originally came from. `packages/components/src/index.ts`
 * carries the same reasoning at the point where it re-exports `I18nProvider`.
 *
 * Why it matters: RAC pins its internals exactly, while every `@react-aria/*` shell keeps a
 * caret range by design, so a consumer's lockfile can legitimately resolve two `react-aria`
 * copies — two module instances, two distinct `I18nContext`s. A provider from one copy then
 * silently fails to satisfy a consumer reading the other: no error, just the default locale.
 * Our own dedupe hides this locally, so it only ever surfaces in a consumer's app. That is the
 * class behind DSTSUP-261 / PR #5514 and DST-1505 / PR #5516. DST-1512 migrated the call
 * sites; this guard exists because four of them were missed and nothing noticed.
 *
 * `check-react-aria-dedupe.mjs` guards the duplicate *tree*; this guards the *import path*
 * that turns such a duplicate into a bug.
 *
 * Scope is the hardcoded glob below, not a computed one. `packages/system` also imports
 * `@react-aria/i18n` — notably the Formatters tests — and must not be flagged, because it has
 * no `react-aria-components` dependency at all: a test provider has to write to the context
 * its subject reads, and the shell is the only context available to it. Should another package
 * ever take on RAC, add it to the glob; nothing here derives the scope from a `package.json`.
 *
 * The guarded names are not a hand-picked list: they are exactly what the paired RAC subpath
 * re-exports. Re-derive them with
 *
 *   cat packages/components/node_modules/react-aria-components/dist/types/exports/I18nProvider.d.ts
 *
 * Only value bindings are guarded — `import type` is erased at build time and cannot split a
 * context, so it is ignored.
 *
 * Run locally: `pnpm check:rac-imports`
 */
import { globSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Shell → the RAC subpath that re-exports it, plus the names that subpath actually exports.
 * Add an entry only after confirming the re-export in RAC's own `.d.ts`, as documented above.
 */
const GUARDED = [
  {
    shell: '@react-aria/i18n',
    racSubpath: 'react-aria-components/I18nProvider',
    names: ['I18nProvider', 'useLocale', 'isRTL'],
  },
];

const errors = [];

// `__screenshots__` holds directories literally named `<Component>.test.tsx`, so the glob
// alone yields entries that cannot be read as files.
const sourceFiles = globSync(
  'packages/components/src/**/*.{ts,tsx,js,jsx,mjs,cjs,mdx}',
  { cwd: root }
).filter(file => statSync(resolve(root, file)).isFile());

const lineOf = (source, index) => source.slice(0, index).split('\n').length;

/** The names a `{ … }` clause binds, with `as` aliases resolved to the imported name. */
const namesIn = clause =>
  clause
    .slice(clause.indexOf('{') + 1, clause.lastIndexOf('}'))
    .split(',')
    // A per-specifier `type` modifier is erased just like a whole-statement `import type`.
    .filter(specifier => !/^\s*type\s/.test(specifier))
    .map(specifier => specifier.split(/\s+as\s+/)[0].trim())
    .filter(Boolean);

const rules = GUARDED.map(guard => ({
  ...guard,
  // Static `import`/`export … from '<shell>'`. `export … from` matters as much as `import`:
  // packages/components/src/index.ts is a barrel, so a re-export is the likeliest way for the
  // wrong copy to come back. `[^;'"]*?` cannot cross a module specifier's quotes, which keeps
  // the clause — and therefore the reported line — inside one statement even when unterminated
  // statements sit above it. The optional `/…` catches deep paths like `<shell>/dist/i18n.mjs`.
  static: new RegExp(
    `\\b(import|export)\\b\\s*(type\\s+)?([^;'"]*?)\\bfrom\\s*['"]${guard.shell}(?:/[^'"]*)?['"]`,
    'g'
  ),
  // `await import('<shell>')` binds its names by destructuring afterwards, so none are visible
  // here — same blind spot as a namespace import, and reported the same way.
  dynamic: new RegExp(
    `\\bimport\\s*\\(\\s*['"]${guard.shell}(?:/[^'"]*)?['"]`,
    'g'
  ),
}));

for (const file of sourceFiles) {
  const source = readFileSync(resolve(root, file), 'utf8');

  for (const { shell, racSubpath, names, ...pattern } of rules) {
    if (!source.includes(shell)) continue;

    const opaque = match =>
      `${file}:${lineOf(source, match.index)}: reaches \`${shell}\` without naming what it ` +
      `binds, so this guard cannot see whether ${names.join(', ')} are among them. Name the ` +
      `bindings explicitly, taking those from \`${racSubpath}\`.`;

    for (const match of source.matchAll(pattern.static)) {
      const [, , typeOnly, clause] = match;
      if (typeOnly) continue;

      if (!clause.includes('{')) {
        errors.push(opaque(match)); // `import * as x` / `import x` / `export * from`
        continue;
      }

      for (const name of namesIn(clause).filter(n => names.includes(n))) {
        errors.push(
          `${file}:${lineOf(source, match.index)}: takes \`${name}\` from \`${shell}\`. ` +
            `\`${racSubpath}\` re-exports it — take it from there instead.`
        );
      }
    }

    for (const match of source.matchAll(pattern.dynamic)) {
      errors.push(opaque(match));
    }
  }
}

if (errors.length > 0) {
  console.error('❌ RAC-first import guard failed:\n');
  for (const e of errors) console.error(`  • ${e}\n`);
  console.error(
    'Rationale: the I18nProvider re-export comment in packages/components/src/index.ts.'
  );
  process.exit(1);
}

console.log(
  `✅ RAC-first import guard passed: packages/components takes ${GUARDED.flatMap(g => g.names).length} ` +
    'RAC-re-exported name(s) from react-aria-components, not the @react-aria/* shells.'
);
