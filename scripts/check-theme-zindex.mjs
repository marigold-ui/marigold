#!/usr/bin/env node
/**
 * Fails when a `*.styles.ts` theme file carries a z-index utility.
 *
 * Stacking order is a component guarantee, not a theme opinion: a toast has to sit above a
 * modal, a tooltip below it, and those relationships hold across every theme. Leaving the
 * value in a theme means a theme can silently reorder the layers. `CLAUDE.md` → "Z-Index
 * Management" carries the rule and the scale; this only enforces where the values live.
 *
 * DST-1547 moved the utilities into the component implementations. DST-1597 then put one
 * back into `ToggleButton.styles.ts`, duplicating the class the component already applied —
 * harmless on the day, drift bait afterwards, and nothing noticed for two tickets. That is
 * the argument for a guard rather than a third cleanup.
 *
 * Deliberately not covered: `themes/theme-rui/src/ui.css`. Its `z-100` sits on the
 * `ui-touch-hitbox` pseudo-element, which has no component to own it. That is the one
 * sanctioned exception, and it is a `.css` file rather than a `*.styles.ts`, so the glob
 * excludes it structurally rather than by a special case.
 *
 * Run locally: `pnpm check:theme-zindex`
 */
import { globSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// A z-index utility starts a class, so it follows a quote, whitespace, a backtick, or a
// variant's `:` — never a letter. Anchoring on that is what keeps Tailwind's 3D transforms
// (`translate-z-10`, `rotate-z-45`) out of the match; a bare `\bz-[0-9]` flags those, because
// the hyphen before `z` is a word boundary too.
// The trailing lookahead rather than `\b`: an arbitrary value ends in `]`, and `\b` cannot
// match between `]` and the closing quote, so `z-[100]` would slip through.
const Z_UTILITY = /(?<=^|[\s'"`:{[(])(-?z-(?:\d+|\[[^\]]*\]|auto))(?![\w-])/gm;
// `[z-index:…]` arbitrary properties and any stray CSS-in-JS `zIndex`.
const Z_PROPERTY = /\bz-index\s*:|\bzIndex\b/g;

const errors = [];

const lineOf = (source, index) => source.slice(0, index).split('\n').length;

for (const file of globSync('**/*.styles.ts', {
  cwd: root,
  exclude: name => name === 'node_modules' || name === 'dist',
})) {
  const source = readFileSync(resolve(root, file), 'utf8');

  for (const match of source.matchAll(Z_UTILITY)) {
    errors.push(
      `${file}:${lineOf(source, match.index)}: carries \`${match[1]}\`. Move it to the ` +
        'component that renders this slot — stacking order is a guarantee the component ' +
        'makes, and a theme must not be able to change it.'
    );
  }

  for (const match of source.matchAll(Z_PROPERTY)) {
    errors.push(
      `${file}:${lineOf(source, match.index)}: sets a z-index directly. Same rule: the ` +
        'component owns stacking order, not the theme.'
    );
  }
}

if (errors.length > 0) {
  console.error('❌ theme z-index guard failed:\n');
  for (const e of errors) console.error(`  • ${e}\n`);
  console.error('The scale and the rule: CLAUDE.md → "Z-Index Management".');
  process.exit(1);
}

console.log(
  '✅ theme z-index guard passed: no z-index in any *.styles.ts — components own stacking order.'
);
