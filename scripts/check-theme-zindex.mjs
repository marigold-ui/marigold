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
 * Scope is `*.styles.{ts,tsx}` — the theme's class definitions, which is exactly what the
 * CLAUDE.md rule names. Plain `.css` in a theme is not scanned at all: raw CSS sometimes has
 * to stack something that has no component to own it, which is why `themes/theme-rui/src/ui.css`
 * legitimately sets `z-100` on the `ui-touch-hitbox` pseudo-element. That exemption is the
 * glob's shape, not a named special case — but it does mean a z-index added to any other theme
 * `.css` file would also go unseen.
 *
 * Known limit: this reads source text, so a class assembled at runtime (`'z-' + level`) is
 * invisible to it. Closing that would need a TypeScript AST, which is far more machinery than
 * a convention guard is worth. It catches what people actually write.
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
// The `(…)` alternative is Tailwind v4's custom-property shorthand: `z-(--stack)` is the same
// utility as `z-[var(--stack)]`, and that shorthand is already used inside these files.
const Z_UTILITY =
  /(?<=^|[\s'"`:{[(])(-?z-(?:\d+|\[[^\]]*\]|\([^)]*\)|auto))(?![\w-])/gm;
// `[z-index:…]` arbitrary properties and any stray CSS-in-JS `zIndex`. Both require the value
// to follow, so prose that merely names `zIndex` — a comment explaining why one is absent, say
// — does not trip the guard.
const Z_PROPERTY = /\bz-index\s*:|\bzIndex\s*[:=]/g;

const errors = [];

const lineOf = (source, index) => source.slice(0, index).split('\n').length;

for (const file of globSync('**/*.styles.{ts,tsx}', {
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
  '✅ theme z-index guard passed: no z-index in any *.styles.{ts,tsx} — components own stacking order.'
);
