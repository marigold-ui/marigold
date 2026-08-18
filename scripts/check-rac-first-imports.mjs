#!/usr/bin/env node
/**
 * Guards the RAC-first import rule inside `packages/components`.
 *
 * The rule: when `react-aria-components` re-exports an API, import it from there — never
 * from the `@react-aria/*` shell it originally came from. `packages/components/src/index.ts`
 * carries the same reasoning at the point where it re-exports `I18nProvider`.
 *
 * Why it matters: RAC pins its internals exactly, while every `@react-aria/*` shell keeps a
 * caret range by design. A consumer lockfile can legitimately resolve two `react-aria` copies,
 * which means two module instances and two distinct `I18nContext`s. A provider from one copy
 * then silently fails to satisfy a consumer reading the other — no error, just the default
 * locale. Our own dedupe hides this locally, so it only ever surfaces in a consumer's app.
 * That is the class behind DSTSUP-261 / PR #5514 and DST-1505 / PR #5516. DST-1512 migrated
 * the call sites; this guard exists because four of them were missed and nothing noticed.
 *
 * `check-react-aria-dedupe.mjs` guards the duplicate *tree*; this guards the *import path*
 * that turns such a duplicate into a bug.
 *
 * Scope: `packages/components` only. `packages/system` does not depend on RAC at all
 * (see its package.json), so its `@react-aria/i18n` imports are the only thing it can write —
 * notably the Formatters tests, whose subjects read locale from `@react-aria/i18n`. A test
 * provider has to write to the context its subject reads.
 *
 * The guarded names are not a hand-picked list: they are exactly what the paired RAC subpath
 * re-exports. Re-derive them with
 *
 *   cat packages/components/node_modules/react-aria-components/dist/types/exports/I18nProvider.d.ts
 *
 * Only value exports are guarded — `import type` is erased at build time and cannot split a
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
const sourceFiles = globSync('packages/components/src/**/*.{ts,tsx}', {
  cwd: root,
}).filter(file => statSync(resolve(root, file)).isFile());

const lineOf = (source, index) => source.slice(0, index).split('\n').length;

/** Specifier list → the imported names, with `type` modifiers and `as` aliases stripped. */
const namesIn = specifiers =>
  specifiers
    .split(',')
    .map(s =>
      s
        .replace(/^\s*type\s+/, '')
        .split(/\s+as\s+/)[0]
        .trim()
    )
    .filter(Boolean);

const rules = GUARDED.map(guard => ({
  ...guard,
  // `[^}]*` keeps the match inside a single brace group, so a multi-line import is covered
  // without a specifier list ever spanning an unrelated statement.
  named: new RegExp(
    `import\\s+(type\\s+)?\\{([^}]*)\\}\\s*from\\s*['"]${guard.shell}['"]`,
    'g'
  ),
  // A namespace or default import reaches every export without naming one, so there is no
  // specifier list to read and the guard cannot tell whether it is being evaded.
  opaque: new RegExp(
    `import\\s+(?!type\\s)(?!\\{)[^;'"]*from\\s*['"]${guard.shell}['"]`,
    'g'
  ),
}));

for (const file of sourceFiles) {
  const source = readFileSync(resolve(root, file), 'utf8');

  for (const { shell, racSubpath, names, named, opaque } of rules) {
    if (!source.includes(shell)) continue;

    for (const match of source.matchAll(named)) {
      const [, typeOnly, specifiers] = match;
      if (typeOnly) continue;

      for (const name of namesIn(specifiers).filter(n => names.includes(n))) {
        errors.push(
          `${file}:${lineOf(source, match.index)}: imports \`${name}\` from \`${shell}\`. ` +
            `\`${racSubpath}\` re-exports it — import it from there instead.`
        );
      }
    }

    for (const match of source.matchAll(opaque)) {
      errors.push(
        `${file}:${lineOf(source, match.index)}: uses a namespace or default import of ` +
          `\`${shell}\`, which reaches ${names.join(', ')} without naming them. Import the ` +
          `specific names you need, taking those ${names.length} from \`${racSubpath}\`.`
      );
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
