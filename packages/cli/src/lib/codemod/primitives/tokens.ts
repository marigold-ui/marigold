import { codeList, parseOr } from '../engine.js';
import type { Codemod, MigrationManifest } from '../types.js';
import { localsFor } from './jsx.js';

// Report-only design-token checks, driven by the manifest's `tokens`
// section. Three kinds of breakage, all invisible to the typechecker:
// - the consumer still references tokens the target version renamed or
//   removed (bites themes built on Marigold's token CSS),
// - the target version's components hardcode NEW tokens the consumer's CSS
//   does not define (bites standalone themes: the classes bypass the theme
//   layer entirely and silently resolve to nothing), and
// - REPURPOSED tokens that kept their name but changed meaning (v18
//   `disabled` flipped background->text) — warned at definition sites for
//   consumers who define them, at old-role usages for those who don't.
// The first two are suppressed per token when the consumer's own CSS
// defines it — then the utility resolves and there is nothing to warn
// about. Repurposing inverts that logic: a definition carrying the old
// meaning is exactly the problem.

/** token names defined (`--color-x:`) in a chunk of CSS */
export const definedTokensIn = (css: string): string[] =>
  [...css.matchAll(/--color-([\w-]+)\s*:/g)].map(m => m[1]);

// Utility prefixes that take a color token (`bg-brand`). A curated list
// keeps text scanning honest: matching bare `-brand` suffixes would also
// hit variants and unrelated identifiers.
// ponytail: covers the color utilities Marigold themes actually use; extend
// the list when a consumer surfaces one we missed.
const COLOR_PREFIXES =
  'bg|text|border|ring|inset-ring|outline|fill|stroke|decoration|divide|accent|caret|shadow|from|via|to|placeholder';

const escapeRegExp = (name: string): string =>
  name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** longest name first, so `warning-muted-foreground` beats `muted-foreground` */
const alternation = (names: string[]): string =>
  [...names]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|');

/**
 * Both ways a token is referenced in consumer text: as a Tailwind color
 * utility (`bg-brand`, also inside variants and with modifiers) and as the
 * raw custom property (`var(--color-brand)`, `bg-(--color-brand)`).
 * The trailing lookahead keeps `focus` from matching `focus-highlight`.
 */
const referencePatterns = (names: string[]): RegExp[] => {
  const alt = alternation(names);
  return [
    new RegExp(`\\b(?:${COLOR_PREFIXES})-(${alt})(?![\\w-])`, 'g'),
    new RegExp(`--color-(${alt})(?![\\w-])`, 'g'),
  ];
};

const lineOf = (source: string, index: number): number =>
  source.slice(0, index).split('\n').length;

const REPORTED_LINES = 5;

interface Finding {
  token: string;
  lines: number[];
  count: number;
  truncated: boolean;
}

/** occurrences grouped by the exact matched reference (`bg-brand`) */
const collectFindings = (
  source: string,
  patterns: RegExp[]
): Map<string, Finding> => {
  const findings = new Map<string, Finding>();
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const finding = findings.get(match[0]) ?? {
        token: match[1],
        lines: [],
        count: 0,
        truncated: false,
      };
      finding.count += 1;
      // matches arrive in source order, so a repeat is always the last line
      const line = lineOf(source, match.index);
      if (finding.lines.at(-1) !== line) {
        if (finding.lines.length < REPORTED_LINES) finding.lines.push(line);
        else finding.truncated = true;
      }
      findings.set(match[0], finding);
    }
  }
  return findings;
};

const lineList = ({ lines, count, truncated }: Finding): string => {
  const label =
    lines.length === 1
      ? `line ${lines[0]}`
      : `lines ${lines.join(', ')}${truncated ? ', …' : ''}`;
  return count > lines.length ? `${count}×, ${label}` : label;
};

/**
 * Text scan (no parse — works on TS, TSX and CSS alike) for token
 * references that break in the target version. Suppressed per token when
 * the consumer's own CSS defines it: then it is the consumer's vocabulary,
 * not a dangling reference.
 */
export const reportTokenUsage = (
  manifest: MigrationManifest,
  defined: ReadonlySet<string>
): Codemod => {
  const { renamed, added, repurposed, referenceUrl } = manifest.tokens;
  const see = referenceUrl ? ` See ${referenceUrl}` : '';
  const gone = Object.keys(renamed).filter(t => !defined.has(t));
  const missing = added.filter(t => !defined.has(t));
  const oldPatterns = gone.length > 0 ? referencePatterns(gone) : [];
  const newPatterns = missing.length > 0 ? referencePatterns(missing) : [];

  // Repurposed tokens (same name, new meaning) split by consumer archetype:
  // - the consumer defines the token: their value still carries the old
  //   meaning, and their own usages stay self-consistent until they remap —
  //   warn once per definition site with the recipe, until the settling
  //   token shows up in their CSS.
  // - the consumer does not define it (the value comes from Marigold's
  //   CSS): the meaning changed under every existing reference — warn on
  //   old-role utilities and on raw var() reads. These warnings end
  //   naturally when the references move to the new vocabulary.
  const repurposedEntries = Object.entries(repurposed);
  const definedRepurposed = repurposedEntries
    .filter(
      ([token, entry]) =>
        defined.has(token) && !(entry.settledBy && defined.has(entry.settledBy))
    )
    .map(([token]) => token);
  const undefinedRepurposed = repurposedEntries.filter(
    ([token]) => !defined.has(token)
  );
  const definitionPatterns =
    definedRepurposed.length > 0
      ? [new RegExp(`--color-(${alternation(definedRepurposed)})\\s*:`, 'g')]
      : [];
  const changedPatterns: RegExp[] = undefinedRepurposed
    .filter(([, entry]) => entry.oldRolePrefixes?.length)
    .map(
      ([token, entry]) =>
        new RegExp(
          `\\b(?:${entry.oldRolePrefixes!.join('|')})-(${escapeRegExp(token)})(?![\\w-])`,
          'g'
        )
    );
  if (undefinedRepurposed.length > 0) {
    changedPatterns.push(
      new RegExp(
        `--color-(${alternation(undefinedRepurposed.map(([t]) => t))})(?![\\w-])`,
        'g'
      )
    );
  }

  return {
    name: 'report-token-usage',
    apply: source => {
      const warnings: string[] = [];
      for (const [ref, finding] of collectFindings(source, oldPatterns)) {
        const replacement = renamed[finding.token];
        warnings.push(
          replacement
            ? `\`${ref}\` (${lineList(finding)}): the \`${finding.token}\` token was renamed in ${manifest.version} — use \`${ref.slice(0, ref.length - finding.token.length)}${replacement}\`.${see}`
            : `\`${ref}\` (${lineList(finding)}): the \`${finding.token}\` token was removed in ${manifest.version} without a 1:1 replacement.${see}`
        );
      }
      for (const [ref, finding] of collectFindings(source, newPatterns)) {
        warnings.push(
          `\`${ref}\` (${lineList(finding)}): the ${manifest.version} token \`${finding.token}\` is not defined in your CSS — define \`--color-${finding.token}\`.${see}`
        );
      }
      for (const finding of collectFindings(
        source,
        definitionPatterns
      ).values()) {
        warnings.push(
          `\`--color-${finding.token}\` (${lineList(finding)}): defined here, but its meaning changed in ${manifest.version} — ${repurposed[finding.token].recipe}.${see}`
        );
      }
      for (const [ref, finding] of collectFindings(source, changedPatterns)) {
        warnings.push(
          `\`${ref}\` (${lineList(finding)}): the \`${finding.token}\` token changed meaning in ${manifest.version} — ${repurposed[finding.token].recipe}.${see}`
        );
      }
      return { kind: 'unchanged', warnings };
    },
  };
};

/**
 * Components whose implementation hardcodes new tokens (not themeable):
 * when the consumer imports one and their CSS misses the token, the
 * component renders partially unstyled and nothing else will catch it.
 */
export const reportTokenDependencies = (
  manifest: MigrationManifest,
  defined: ReadonlySet<string>
): Codemod => {
  const pending = Object.entries(manifest.tokens.componentDependencies)
    .map(([component, dep]) => ({
      component,
      missing: dep.tokens.filter(t => !defined.has(t)),
      url: dep.url ?? manifest.tokens.referenceUrl,
    }))
    .filter(entry => entry.missing.length > 0);

  return {
    name: 'report-token-dependencies',
    apply: source => {
      if (pending.length === 0) return { kind: 'unchanged', warnings: [] };
      return parseOr(source, file => {
        const warnings: string[] = [];
        const imported = new Set(
          localsFor(
            file,
            pending.map(e => e.component)
          ).values()
        );
        for (const entry of pending) {
          if (!imported.has(entry.component)) continue;
          warnings.push(
            `${entry.component}: its ${manifest.version} implementation hardcodes ${codeList(entry.missing)} — not defined in your CSS, so the component renders partially unstyled; define the \`--color-*\` variable(s).${entry.url ? ` See ${entry.url}` : ''}`
          );
        }
        return { kind: 'unchanged', warnings };
      });
    },
  };
};
