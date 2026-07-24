import pc from 'picocolors';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { findThemeComponents } from '../lib/codemod/anchor.js';
import {
  codeList,
  detectIndentUnit,
  stylesReference,
} from '../lib/codemod/engine.js';
import { v18 } from '../lib/codemod/manifests/v18.js';
import {
  removeJsxProps,
  renameImports,
  renameJsxMembers,
  renameJsxProps,
  reportJsxUsage,
} from '../lib/codemod/primitives/jsx.js';
import {
  reportDeadKeys,
  reportStructure,
} from '../lib/codemod/primitives/report.js';
import { restructureToSlots } from '../lib/codemod/primitives/restructure-to-slots.js';
import {
  addIndexExport,
  generateScaffold,
} from '../lib/codemod/primitives/scaffold-component.js';
import { stubMissingSlots } from '../lib/codemod/primitives/stub-missing-slots.js';
import { swapExactClasses } from '../lib/codemod/primitives/swap-exact-classes.js';
import {
  definedTokensIn,
  reportTokenDependencies,
  reportTokenUsage,
} from '../lib/codemod/primitives/tokens.js';
import type { Codemod, MigrationManifest } from '../lib/codemod/types.js';
import {
  declaredVersion,
  installedVersion,
  readPackageJson,
} from '../lib/doctor/package-json.js';
import { minVersionFromRange } from '../lib/doctor/version.js';
import { highlightCode } from '../lib/format.js';
import type { AnyNode } from '../lib/tsx-ast.js';
import { parseTsx } from '../lib/tsx-ast.js';

const MANIFESTS: Record<string, MigrationManifest> = { v18 };

export interface DetectedMigration {
  /** installed @marigold/components version (or the declared range minimum) */
  installed: string;
  /** where the version was read from */
  source: 'node_modules' | 'package.json';
  /** applicable migrations in run order, e.g. ['v18'] — empty: up to date */
  versions: string[];
}

/**
 * Detect the consumer's Marigold version by walking up from the target path
 * (theme directories usually sit far below the repo root that owns
 * node_modules), preferring the installed package over the declared range.
 * Returns null when no @marigold/components is found at all.
 */
export const detectMigration = (
  targetPath: string
): DetectedMigration | null => {
  const found = ((): Omit<DetectedMigration, 'versions'> | null => {
    let dir = path.resolve(targetPath);
    for (;;) {
      const installed = installedVersion(dir, '@marigold/components');
      if (installed) return { installed, source: 'node_modules' };
      const declared = declaredVersion(
        readPackageJson(path.join(dir, 'package.json')),
        '@marigold/components'
      );
      const min = declared ? minVersionFromRange(declared) : null;
      if (min) return { installed: min, source: 'package.json' };
      const parent = path.dirname(dir);
      if (parent === dir) return null;
      dir = parent;
    }
  })();
  if (!found) return null;

  // Propose migrations targeting the installed major too (>=, not >): the
  // documented procedure is "upgrade the packages, then migrate", so someone
  // on 18.x is exactly who needs the v18 migration. Re-running is a no-op.
  const major = Number.parseInt(found.installed, 10);
  const versions = Object.keys(MANIFESTS)
    .map(v => ({ v, target: Number.parseInt(v.replace(/^v/, ''), 10) }))
    .filter(({ target }) => Number.isFinite(target) && target >= major)
    .sort((a, b) => a.target - b.target)
    .map(({ v }) => v);
  return { ...found, versions };
};

export interface MigrateOptions {
  version: string;
  targetPath: string;
  dryRun: boolean;
  /**
   * Names of the changes to apply (codemod names plus 'scaffold-components').
   * Report-only passes always run. Omitted: everything runs.
   */
  only?: readonly string[];
}

/** one selectable change of a migration, with its impact on the target */
export interface CodemodSummary {
  name: string;
  description: string;
  files: number;
  changes: number;
}

export interface MigrateResult {
  output: string;
  /** changes that fired on this target, in pipeline order — the
   *  pre-analysis a caller can offer for selection via `only` */
  summary: CodemodSummary[];
}

const SCAFFOLD = 'scaffold-components';

// user-facing one-liners for the selectable changes (report-only passes are
// not selectable: they are the safety net and always run)
const DESCRIPTIONS: Record<string, string> = {
  'restructure-to-slots': 'move single-style theme components to slot objects',
  'swap-exact-classes': 'swap unchanged baseline styles to the new baseline',
  'stub-missing-slots': 'stub new theme slots with empty cva()',
  'rename-jsx-members': 'rename compound components (e.g. Tabs.TabPanel)',
  'rename-jsx-props': 'rename component props (e.g. Inset space to p)',
  'remove-jsx-props': 'remove props the target version dropped',
  'rename-imports': 'rename moved exports (e.g. the icon renames)',
  [SCAFFOLD]: 'create theme styles for components the target version requires',
};

const IGNORED_DIRS = new Set([
  'node_modules',
  'vendor', // Composer's node_modules
  'dist',
  'build',
  'coverage',
  'storybook-static',
  '.git',
  '.next',
  '.turbo',
]);

const collectSourceFiles = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      out.push(...collectSourceFiles(path.join(dir, entry.name)));
    } else if (
      /\.(tsx?|css)$/.test(entry.name) &&
      !entry.name.endsWith('.d.ts') &&
      !entry.name.endsWith('.min.css') // minified = build artifact
    ) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
};

interface FileReport {
  file: string;
  changes: string[];
  warnings: string[];
  skips: string[];
  output: string;
  /** change count per codemod name, for the pre-analysis summary */
  perCodemod: Record<string, number>;
}

const edited = (report: FileReport): boolean => report.changes.length > 0;

const applyPipeline = (
  codemods: Codemod[],
  source: string,
  file: string
): FileReport => {
  const report: FileReport = {
    file,
    changes: [],
    warnings: [],
    skips: [],
    output: source,
    perCodemod: {},
  };
  for (const codemod of codemods) {
    // each transform re-parses its input when chained; babel parse is fast
    // and shared-AST plumbing is not worth it
    const outcome = codemod.apply(report.output);
    if (outcome.kind === 'skipped') {
      report.skips.push(`${codemod.name}: ${outcome.reason}`);
      continue;
    }
    report.warnings.push(...outcome.warnings);
    if (outcome.kind === 'edited') {
      report.output = outcome.output;
      report.changes.push(...outcome.changes);
      report.perCodemod[codemod.name] =
        (report.perCodemod[codemod.name] ?? 0) + outcome.changes.length;
    }
  }
  return report;
};

export const runMigrate = (options: MigrateOptions): MigrateResult => {
  const manifest = MANIFESTS[options.version];
  if (!manifest) {
    throw new Error(
      `Unknown migration '${options.version}' (available: ${Object.keys(MANIFESTS).join(', ')})`
    );
  }

  // read each candidate once; every later pass works on this snapshot
  const root = path.resolve(options.targetPath);
  const texts = new Map<string, string>();
  for (const file of collectSourceFiles(root).sort()) {
    texts.set(file, readFileSync(file, 'utf8'));
  }
  // '@marigold/' covers system (themes), components (JSX) and icons (imports)
  const sources = new Map<string, string>();
  for (const [file, text] of texts) {
    if (!file.endsWith('.css') && text.includes('@marigold/')) {
      sources.set(file, text);
    }
  }

  // The consumer's token vocabulary: `--color-*` definitions in their CSS.
  // Token warnings are suppressed per defined token — a theme built on
  // Marigold's token CSS defines every added token by construction.
  const definedTokens = new Set<string>();
  for (const [file, text] of texts) {
    if (!file.endsWith('.css')) continue;
    for (const token of definedTokensIn(text)) definedTokens.add(token);
  }
  if ([...texts.values()].some(t => t.includes('@marigold/theme-rui'))) {
    for (const token of manifest.tokens.added) definedTokens.add(token);
  }

  // pass 1: inventory of theme components across the consumer tree
  const inventory = new Map<string, string>();
  for (const [file, source] of sources) {
    let ast;
    try {
      ast = parseTsx(source);
    } catch {
      continue; // unparseable files are reported by the pipeline pass
    }
    for (const decl of findThemeComponents(ast as unknown as AnyNode)) {
      if (!inventory.has(decl.component)) inventory.set(decl.component, file);
    }
  }

  // pass 2: per-file pipeline. Order matters: restructure first (single-cva
  // becomes a slot object), swap before stubbing (a stubbed cva({}) must not
  // be mistaken for a customized slot), reports last. The JSX transforms are
  // independent of the theme ones; they anchor on @marigold/components.
  const tokenUsage = reportTokenUsage(manifest, definedTokens);
  const editCodemods = [
    restructureToSlots(manifest),
    swapExactClasses(manifest),
    stubMissingSlots(manifest),
    renameJsxMembers(manifest),
    renameJsxProps(manifest),
    removeJsxProps(manifest),
    renameImports(manifest),
  ];
  if (options.only) {
    const known = new Set([...editCodemods.map(c => c.name), SCAFFOLD]);
    const unknown = options.only.filter(name => !known.has(name));
    if (unknown.length > 0) {
      throw new Error(
        `Unknown change(s): ${unknown.join(', ')} (available: ${[...known].join(', ')})`
      );
    }
  }
  const active = options.only
    ? editCodemods.filter(c => options.only!.includes(c.name))
    : editCodemods;
  const scaffoldEnabled = !options.only || options.only.includes(SCAFFOLD);
  const codemods = [
    ...active,
    reportDeadKeys(manifest),
    reportStructure(manifest),
    reportJsxUsage(manifest),
    reportTokenDependencies(manifest, definedTokens),
    tokenUsage,
  ];
  const reports: FileReport[] = [];
  for (const [file, source] of sources) {
    const report = applyPipeline(codemods, source, file);
    if (
      edited(report) ||
      report.warnings.length > 0 ||
      report.skips.length > 0
    ) {
      reports.push(report);
    }
    if (edited(report) && !options.dryRun) {
      writeFileSync(file, report.output);
    }
  }

  // pass 2.5: token references live anywhere, not only in @marigold
  // importers (own token CSS, generated CSS, plain components) — text-scan
  // the files the pipeline did not see.
  for (const [file, text] of texts) {
    if (sources.has(file)) continue;
    const outcome = tokenUsage.apply(text);
    if (outcome.kind !== 'skipped' && outcome.warnings.length > 0) {
      reports.push({
        file,
        changes: [],
        warnings: outcome.warnings,
        skips: [],
        output: text,
        perCodemod: {},
      });
    }
  }

  // pass 3: scaffold components the target version added, next to the theme
  // files that require them, and register them in the local barrel file.
  const created: string[] = [];
  const scaffoldWarnings: string[] = [];
  for (const entry of scaffoldEnabled ? manifest.scaffolds : []) {
    if (inventory.has(entry.name)) continue;
    const host = entry.requiredBy.map(c => inventory.get(c)).find(Boolean);
    if (!host) continue;
    const moduleBase = `${entry.name}.styles`;
    const dir = path.dirname(host);
    const target = path.join(dir, `${moduleBase}.ts`);
    if (existsSync(target)) {
      scaffoldWarnings.push(
        `${path.relative(root, target)} already exists but does not define ${entry.name} — check manually`
      );
      continue;
    }
    const content = generateScaffold(
      entry,
      manifest,
      detectIndentUnit(sources.get(host) ?? '')
    );
    if (!options.dryRun) writeFileSync(target, content);
    const found = entry.requiredBy.filter(c => inventory.has(c));
    const because = entry.reason
      ? ` — ${entry.reason} (your theme defines ${codeList(found)})`
      : '';
    const reference = stylesReference(manifest, entry.name);
    created.push(
      `${path.relative(root, target)}${because}${
        reference ? ` — reference styles: ${reference}` : ''
      }`
    );

    const index = path.join(dir, 'index.ts');
    if (existsSync(index)) {
      const outcome = addIndexExport(
        moduleBase,
        `registers the scaffolded \`${entry.name}\` styles in the theme barrel`
      ).apply(readFileSync(index, 'utf8'));
      if (outcome.kind === 'edited') {
        if (!options.dryRun) writeFileSync(index, outcome.output);
        reports.push({
          file: index,
          changes: outcome.changes,
          warnings: [],
          skips: [],
          output: outcome.output,
          perCodemod: { [SCAFFOLD]: outcome.changes.length },
        });
      }
    } else {
      scaffoldWarnings.push(
        `${path.relative(root, dir)}/index.ts not found — export ${entry.name} from your theme manually`
      );
    }
  }

  // pre-analysis summary: which changes fired, aggregated across files, in
  // pipeline order (scaffolds last) — offered to the caller for selection
  const totals = new Map<string, { files: number; changes: number }>();
  for (const report of reports) {
    for (const [name, changes] of Object.entries(report.perCodemod)) {
      const total = totals.get(name) ?? { files: 0, changes: 0 };
      total.files += 1;
      total.changes += changes;
      totals.set(name, total);
    }
  }
  if (created.length > 0) {
    const total = totals.get(SCAFFOLD) ?? { files: 0, changes: 0 };
    total.files += created.length;
    total.changes += created.length;
    totals.set(SCAFFOLD, total);
  }
  const summary: CodemodSummary[] = [...editCodemods.map(c => c.name), SCAFFOLD]
    .filter(name => totals.has(name))
    .map(name => ({
      name,
      description: DESCRIPTIONS[name] ?? '',
      ...totals.get(name)!,
    }));

  // render report. picocolors is TTY-aware: piped / test / agent output stays
  // byte-for-byte plain, only interactive terminals gain color.
  // `code` spans render cyan (same convention as doctor), URLs cyan+underline.
  const decorate = (text: string): string =>
    highlightCode(
      text.replace(/https?:\/\/\S+/g, url => pc.underline(pc.cyan(url)))
    );
  // Multi-line warnings carry a token diff; continuation lines starting with
  // -/+ render like a git diff.
  const pushWarning = (lines: string[], warning: string): void => {
    const [first, ...rest] = warning.split('\n');
    lines.push(`  ${pc.yellow('!')} ${decorate(first)}`);
    for (const cont of rest) {
      const colored = cont.startsWith('+')
        ? pc.green(cont)
        : cont.startsWith('-')
          ? pc.red(cont)
          : cont;
      lines.push(`    ${colored}`);
    }
  };
  const lines: string[] = [
    pc.bold(
      `marigold migrate ${manifest.version}${options.dryRun ? ' (dry run)' : ''}`
    ),
    '',
  ];
  if (sources.size === 0) {
    lines.push(
      `No files importing @marigold/system or @marigold/components found under ${root}.`
    );
    return { output: lines.join('\n'), summary: [] };
  }
  for (const report of reports) {
    lines.push(pc.bold(path.relative(root, report.file)));
    for (const change of report.changes) {
      lines.push(`  ${pc.green('~')} ${decorate(change)}`);
    }
    for (const warning of report.warnings) pushWarning(lines, warning);
    for (const skip of report.skips) lines.push(pc.dim(`  - ${skip}`));
    lines.push('');
  }
  for (const file of created) {
    lines.push(`${pc.green('+')} created ${decorate(file)}`);
  }
  for (const warning of scaffoldWarnings) {
    lines.push(`${pc.yellow('!')} ${decorate(warning)}`);
  }
  if (created.length > 0 || scaffoldWarnings.length > 0) lines.push('');

  const editedCount = reports.filter(edited).length;
  const warningCount =
    reports.reduce((n, r) => n + r.warnings.length, 0) +
    scaffoldWarnings.length;
  lines.push(
    pc.bold(
      `${options.dryRun ? 'Would edit' : 'Edited'} ${editedCount} file(s), ` +
        `${options.dryRun ? 'would create' : 'created'} ${created.length} file(s), ` +
        `${warningCount} warning(s).`
    )
  );
  if (!options.dryRun) {
    lines.push(
      pc.dim(
        `Run your typechecker now — the exhaustive slot Records in @marigold/system make it the completeness check.`
      )
    );
  }
  return { output: lines.join('\n'), summary };
};
