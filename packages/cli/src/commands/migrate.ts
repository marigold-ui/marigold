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
import { v19 } from '../lib/codemod/manifests/v19.js';
import {
  MARIGOLD_PACKAGES,
  covers,
  declaresMarigold,
  findMarkerFile,
  migrationMajor,
  readMarker,
  writeMarker,
} from '../lib/codemod/marker.js';
import {
  removeJsxProps,
  renameImports,
  renameJsxMembers,
  renameJsxProps,
  reportJsxUsage,
  reportNamespaceImports,
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

const MANIFESTS: Record<string, MigrationManifest> = { v18, v19 };

export interface DetectedMigration {
  /** the package the version was read from; released in lockstep */
  package: (typeof MARIGOLD_PACKAGES)[number];
  /** its installed version (or the declared range minimum) */
  installed: string;
  /** where the version was read from */
  source: 'node_modules' | 'package.json';
  /** last applied migration from the package.json marker, null when none */
  migrated: string | null;
  /** pending migrations up to the installed major, in run order */
  versions: string[];
  /** pending migrations for a major that is not installed yet */
  awaitingUpgrade: string[];
}

/**
 * Detect the consumer's Marigold version by walking up from the target path
 * (theme directories usually sit far below the repo root that owns
 * node_modules), preferring the installed package over the declared range
 * and @marigold/components over @marigold/system. Returns null when neither
 * is found at all.
 */
export const detectMigration = (
  targetPath: string
): DetectedMigration | null => {
  type Found = Pick<DetectedMigration, 'package' | 'installed' | 'source'>;
  const found = ((): Found | null => {
    let dir = path.resolve(targetPath);
    for (;;) {
      const pkg = readPackageJson(path.join(dir, 'package.json'));
      for (const name of MARIGOLD_PACKAGES) {
        const installed = installedVersion(dir, name);
        if (installed) {
          return { package: name, installed, source: 'node_modules' };
        }
        const declared = declaredVersion(pkg, name);
        const min = declared ? minVersionFromRange(declared) : null;
        if (min)
          return { package: name, installed: min, source: 'package.json' };
      }
      const parent = path.dirname(dir);
      if (parent === dir) return null;
      dir = parent;
    }
  })();
  if (!found) return null;

  // Pending = newer than the marker. "Upgrade the packages, then migrate":
  // a migration runs once its major is installed, never against older types.
  const markerFile = findMarkerFile(targetPath);
  const migrated = markerFile ? readMarker(markerFile) : null;
  const major = Number.parseInt(found.installed, 10);
  const pending = Object.keys(MANIFESTS)
    .filter(v => !covers(migrated, v))
    .map(v => ({ v, target: migrationMajor(v) }))
    .filter(({ target }) => Number.isFinite(target))
    .sort((a, b) => a.target - b.target);
  return {
    ...found,
    migrated,
    versions: pending.filter(p => p.target <= major).map(({ v }) => v),
    awaitingUpgrade: pending.filter(p => p.target > major).map(({ v }) => v),
  };
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

// Scaffolding is a pipeline phase rather than a Codemod (it creates files
// instead of editing one), so unlike the codemods it carries its selection
// name and description here.
const SCAFFOLD = 'scaffold-components';
const SCAFFOLD_DESCRIPTION =
  'create theme styles for components the target version requires';

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

// `nested` set: stop at packages that declare Marigold, they record their own run
const collectSourceFiles = (dir: string, nested?: string[]): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      const sub = path.join(dir, entry.name);
      if (nested && declaresMarigold(path.join(sub, 'package.json'))) {
        nested.push(sub);
        continue;
      }
      out.push(...collectSourceFiles(sub, nested));
    } else if (
      /\.(tsx?|jsx?|css)$/.test(entry.name) &&
      !entry.name.endsWith('.d.ts') &&
      !/\.min\.(css|js)$/.test(entry.name) // minified = build artifact
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
      // one parse error hits every parsing codemod — report it once
      if (!report.skips.some(skip => skip.endsWith(outcome.reason))) {
        report.skips.push(`${codemod.name}: ${outcome.reason}`);
      }
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
  // inside a package, a run stays in it; elsewhere (a dry run) it spans all
  const nested: string[] | undefined = findMarkerFile(root) ? [] : undefined;
  const texts = new Map<string, string>();
  for (const file of collectSourceFiles(root, nested).sort()) {
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
    ...(manifest.transforms ?? []),
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
    reportNamespaceImports(manifest),
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
  // the files the pipeline did not see. This is the exact complement of
  // `sources`, so tightening that filter shifts files between the two passes
  // and can never narrow token coverage. The scan stays inside the pipeline
  // for the files it does cover, because there it runs on the post-edit text
  // and so sees classes `swap-exact-classes` just introduced.
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
  const summary: CodemodSummary[] = [
    ...editCodemods.map(c => ({ name: c.name, description: c.description })),
    { name: SCAFFOLD, description: SCAFFOLD_DESCRIPTION },
  ]
    .filter(({ name }) => totals.has(name))
    .map(entry => ({ ...entry, ...totals.get(entry.name)! }));

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
  for (const dir of (nested ?? []).sort()) {
    lines.push(
      `${pc.yellow('!')} Skipped ${path.relative(root, dir)}: a separate package with its own record. Migrate it on its own: marigold migrate ${manifest.version} ${dir}`
    );
  }
  if (nested?.length) lines.push('');
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

/** a prompt has to be shown AND answered, so both ends must be a terminal */
const canPrompt = (): boolean =>
  Boolean(process.stdout.isTTY && process.stdin.isTTY);

export interface MigrateCommandOptions {
  /** migration to run (`v18`); omitted: detect it and confirm interactively */
  version?: string;
  targetPath: string;
  dryRun: boolean;
  /** `--only` names; skips the interactive change selection */
  only?: readonly string[];
  /** where reports and status messages go */
  write: (output: string) => void;
  /** override the TTY check (tests) */
  interactive?: boolean;
}

/**
 * The package.json an applied run records into. The marker is per package, so
 * the path has to be that package's folder: from a subfolder it would mark
 * code the run never touched, from a folder above it records nothing.
 */
const packageScope = (targetPath: string, command: string): string => {
  const file = findMarkerFile(targetPath);
  if (!file) {
    throw new Error(
      `Cannot apply a migration to ${targetPath}: no package.json at or above it declares @marigold/components or @marigold/system, so the CLI cannot record what it applied. ` +
        `Run it on each package that declares one of them, or add --dry-run to only report.`
    );
  }
  const dir = path.dirname(file);
  if (dir !== path.resolve(targetPath)) {
    throw new Error(
      `Cannot apply a migration to ${targetPath} alone: migrations are recorded per package, and it is part of ${dir}. ` +
        `Run it on the package instead: ${command} ${dir}. Add --dry-run to report on ${targetPath} only.`
    );
  }
  return file;
};

/**
 * Write the applied-migrations marker after a real run. Returns false when
 * the marker could not be written: the code edits have already landed, so
 * the caller stops before a later migration builds on an unrecorded one.
 */
const recordMigration = (
  version: string,
  file: string,
  write: (output: string) => void
): boolean => {
  try {
    if (writeMarker(file, version)) {
      write(`Recorded ${version} as applied in ${file}.`);
    }
    return true;
  } catch (error) {
    write(
      `Warning: the ${version} changes were applied but could not be recorded in ${file}: ${error instanceof Error ? error.message : String(error)}. ` +
        `Add "marigold": { "migrated": "${version}" } to it by hand, otherwise marigold migrate will offer ${version} again.`
    );
    return false;
  }
};

/**
 * How an explicitly named migration runs: refused when the marker already
 * covers it, unless `--only` names the changes, which completes it with a
 * warning, or it is a dry run, which writes nothing. One for a major that is not installed yet
 * warns but still runs.
 */
const checkNamedRun = (
  version: string,
  targetPath: string,
  only: readonly string[] | undefined,
  dryRun: boolean,
  write: (output: string) => void
): 'refuse' | 'complete' | 'first' => {
  // unknown names are reported by runMigrate
  if (!MANIFESTS[version]) return 'first';
  // read directly: detection gives up on ranges like ^19 or workspace:*
  const markerFile = findMarkerFile(targetPath);
  const migrated = markerFile ? readMarker(markerFile) : null;
  const recorded = covers(migrated, version);
  if (recorded && !only && dryRun) {
    write(
      `${version} is already applied (last applied: ${migrated}). This dry run shows what a re-run would change. Applying it would be refused.`
    );
  } else if (recorded && !only) {
    write(
      `${version} is already applied (last applied: ${migrated}), so nothing was run: a second run can rename props it already renamed. ` +
        `To apply changes you skipped, name them: marigold migrate ${version} ${markerFile ? path.dirname(markerFile) : targetPath} --only <names>`
    );
    return 'refuse';
  } else if (recorded && !dryRun) {
    write(
      `Completing ${version}, which is already applied (last applied: ${migrated}). Name only changes that did not run before: one that already ran can rename props again.`
    );
  }
  const detected = detectMigration(targetPath);
  const target = migrationMajor(version);
  if (detected && target > Number.parseInt(detected.installed, 10)) {
    write(
      `Warning: ${version} targets ${detected.package} ${target}, but ${detected.installed} is installed. ` +
        `It rewrites code still typed against the older version, so upgrade first if you can. Running it because it was named explicitly.`
    );
  }
  return recorded ? 'complete' : 'first';
};

/**
 * The `marigold migrate` flow: resolve which migration(s) to run (explicit,
 * or detected from the target and confirmed), offer the changes that fire
 * for deselection, then apply. Prompts happen only on a real terminal; every
 * non-interactive path either runs unattended or throws with instructions.
 * Returns the exit code (1 when a named migration was refused or could not
 * be recorded, 130 when the user aborted a prompt).
 */
export const runMigrateCommand = async (
  options: MigrateCommandOptions
): Promise<number> => {
  const { targetPath, dryRun, only, write } = options;
  const interactive = options.interactive ?? canPrompt();

  let versions: string[];
  // null exactly when nothing is written: a dry run
  let markerFile: string | null = null;
  // completing a recorded migration: what it skipped before is unknowable
  let completing = false;
  if (options.version) {
    const mode = checkNamedRun(
      options.version,
      targetPath,
      only,
      dryRun,
      write
    );
    // nothing ran, so `migrate && commit` must not go on
    if (mode === 'refuse') return 1;
    if (!dryRun) {
      markerFile = packageScope(
        targetPath,
        `marigold migrate ${options.version}`
      );
    }
    completing = mode === 'complete';
    versions = [options.version];
  } else {
    const detected = detectMigration(targetPath);
    if (!detected) {
      throw new Error(
        `Could not find @marigold/components or @marigold/system under ${targetPath} — pass the migration explicitly: marigold migrate v18 [path]`
      );
    }
    if (detected.versions.length === 0) {
      const [next] = detected.awaitingUpgrade;
      const applied = detected.migrated
        ? ` (last applied: ${detected.migrated})`
        : '';
      write(
        next
          ? `Detected ${detected.package} ${detected.installed} (${detected.source})${applied} — the ${next} migration needs ${detected.package} ${migrationMajor(next)} installed first. Upgrade, then run marigold migrate again.`
          : `Detected ${detected.package} ${detected.installed} (${detected.source})${applied} — already up to date, no migration to run.`
      );
      return 0;
    }
    if (!dryRun) markerFile = packageScope(targetPath, 'marigold migrate');
    if (!interactive) {
      throw new Error(
        `Detected ${detected.package} ${detected.installed} — would run ${detected.versions.join(', then ')}. ` +
          `Non-interactive session: confirm by passing the version explicitly, e.g. marigold migrate ${detected.versions[0]} [path]`
      );
    }
    const { confirm, isCancel } = await import('@clack/prompts');
    const proceed = await confirm({
      message:
        `Detected ${detected.package} ${detected.installed} (${detected.source}). ` +
        `Run the ${detected.versions.join(', then the ')} migration${dryRun ? ' (dry run)' : ''}?`,
    });
    if (isCancel(proceed) || proceed !== true) {
      write('Aborted — nothing changed.');
      return 130;
    }
    versions = detected.versions;
  }

  // applied and recorded so far, so an abort can say what already changed
  const applied: string[] = [];
  for (const version of versions) {
    // pre-analysis: dry-run in memory, offer the fired changes for
    // selection. Skipped for explicit --only / --dry-run / non-TTY runs.
    let selected = only;
    let fired: string[] | undefined;
    if (!selected && !dryRun && interactive) {
      const analysis = runMigrate({ version, targetPath, dryRun: true });
      fired = analysis.summary.map(s => s.name);
      if (analysis.summary.length > 0) {
        const { multiselect, isCancel } = await import('@clack/prompts');
        const chosen = await multiselect({
          message: `The ${version} migration fires these changes — deselect what you want to skip (warnings always run):`,
          options: analysis.summary.map(s => ({
            value: s.name,
            label: s.name,
            hint: `${s.description} — ${s.changes} change(s) in ${s.files} file(s)`,
          })),
          initialValues: analysis.summary.map(s => s.name),
          required: false,
        });
        if (isCancel(chosen)) {
          write(
            applied.length > 0
              ? `Aborted — ${version} not applied. Already applied and recorded: ${applied.join(', ')}.`
              : 'Aborted — nothing changed.'
          );
          return 130;
        }
        selected = chosen as string[];
        // recording an empty run would mark untouched code as migrated
        if (selected.length === 0) {
          write(
            applied.length > 0
              ? `Nothing selected — ${version} not applied. Already applied and recorded: ${applied.join(', ')}.`
              : `Nothing selected — ${version} not applied.`
          );
          return 0;
        }
      }
    }

    // analyse before applying, first run only: a non-idempotent change re-fires on its own output
    if (!completing && selected && !dryRun && !fired) {
      fired = runMigrate({ version, targetPath, dryRun: true }).summary.map(
        s => s.name
      );
    }

    write(runMigrate({ version, targetPath, dryRun, only: selected }).output);
    if (!markerFile) continue;

    const skipped =
      selected && fired ? fired.filter(name => !selected.includes(name)) : [];
    if (skipped.length > 0) {
      write(
        `Skipped in ${version}: ${skipped.join(', ')}. To apply later: marigold migrate ${version} ${targetPath} --only ${skipped.join(',')}`
      );
    }
    if (!recordMigration(version, markerFile, write)) return 1;
    applied.push(version);
  }
  return 0;
};
