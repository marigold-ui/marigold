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
import type { Codemod, MigrationManifest } from '../lib/codemod/types.js';
import { highlightCode } from '../lib/format.js';
import type { AnyNode } from '../lib/tsx-ast.js';
import { parseTsx } from '../lib/tsx-ast.js';

const MANIFESTS: Record<string, MigrationManifest> = { v18 };

export interface MigrateOptions {
  version: string;
  targetPath: string;
  dryRun: boolean;
}

export interface MigrateResult {
  output: string;
}

const IGNORED_DIRS = new Set([
  'node_modules',
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
    } else if (/\.tsx?$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
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
  // '@marigold/' covers system (themes), components (JSX) and icons (imports)
  const sources = new Map<string, string>();
  for (const file of collectSourceFiles(root).sort()) {
    const source = readFileSync(file, 'utf8');
    if (source.includes('@marigold/')) {
      sources.set(file, source);
    }
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
  const codemods = [
    restructureToSlots(manifest),
    swapExactClasses(manifest),
    stubMissingSlots(manifest),
    renameJsxMembers(manifest),
    renameJsxProps(manifest),
    removeJsxProps(manifest),
    renameImports(manifest),
    reportDeadKeys(manifest),
    reportStructure(manifest),
    reportJsxUsage(manifest),
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

  // pass 3: scaffold components the target version added, next to the theme
  // files that require them, and register them in the local barrel file.
  const created: string[] = [];
  const scaffoldWarnings: string[] = [];
  for (const entry of manifest.scaffolds) {
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
        });
      }
    } else {
      scaffoldWarnings.push(
        `${path.relative(root, dir)}/index.ts not found — export ${entry.name} from your theme manually`
      );
    }
  }

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
    return { output: lines.join('\n') };
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
  return { output: lines.join('\n') };
};
