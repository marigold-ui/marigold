#!/usr/bin/env node
import pc from 'picocolors';
import { readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { runCompleteSuggest, runCompletion } from '../commands/completion.js';
import { runDocs } from '../commands/docs.js';
import { type ExamplesSubcommand, runExamples } from '../commands/examples.js';
import { runList } from '../commands/list.js';
import { runSearch } from '../commands/search.js';
import {
  type TelemetrySubcommand,
  runTelemetry,
} from '../commands/telemetry.js';
import type { ValidateChecks, ValidateFormat } from '../commands/validate.js';
import {
  EXAMPLES_SUBCOMMANDS,
  type SubcommandName,
  TOP_LEVEL_NAMES,
} from '../lib/commands-spec.js';
import type { Section } from '../lib/docs.js';
import type { OutputFormat } from '../lib/format.js';
import { emit } from '../lib/telemetry.js';

// Package root: dist/bin/marigold.mjs → ../.. = packages/cli/
const packageRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);

// In local dev only, pick up packages/cli/.env.local. The file is excluded
// from the published `files` array, so this is a no-op for installed copies.
// loadEnvFile preserves existing process.env values, so explicit shell
// exports still win.
try {
  process.loadEnvFile(path.join(packageRoot, '.env.local'));
} catch {
  // file absent or unreadable — ignore
}

const readCliVersion = (): string => {
  try {
    const pkg = JSON.parse(
      readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
    ) as { version?: string };
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
};

const CLI_VERSION = readCliVersion();

// Update the URL, once the CLI docs are published.
const help = `
${pc.bold('marigold')} — Marigold Design System CLI

${pc.bold('Usage:')}
  marigold <command> [options]

${pc.bold('Commands:')}
  docs <name|slug>      Fetch docs for a component or page
  list                  List available components and pages
  search <query>        Find components by what their docs say
  examples <action>     Browse application patterns (list | get <slug>)
  validate <file>       Validate a Marigold component file
  init                  Set up Marigold in a project
  telemetry <action>    Manage telemetry (status|enable|disable)
  completion <shell>    Print shell completion script (bash|zsh|fish)

${pc.bold('Docs options:')}
  --section <name>    props | usage | examples | all (default: all)
  --format  <name>    markdown | json | plain (default: markdown)
  --fresh             Bypass the local cache
  --offline           Use only the local cache

${pc.bold('List options:')}
  --category <name>   Filter by category (actions, form, foundations,
                      patterns, getting-started, ...)
  --search   <term>   Filter by name
  --format   <name>   markdown | json | plain

${pc.bold('Search options:')}
  --limit    <n>      Max results (default: 5)
  --format   <name>   markdown | json | plain (default: markdown)
  --fresh             Bypass the local cache
  --offline           Use only the local cache

${pc.bold('Examples options:')}
  --format   <name>   markdown | json | plain (default: markdown)
  --fresh             Bypass the local cache
  --offline           Use only the local cache

${pc.bold('Validate options:')}
  --checks <name>     technical | spatial | a11y | all (default: all)
  --format <name>     text | json (default: text)

${pc.bold('Init options:')}
  --yes               Skip confirmation prompts
  --skip-install      Don't run the package install step

${pc.bold('Environment:')}
  MARIGOLD_DOCS_URL              Override docs site base URL
  MARIGOLD_CACHE_TTL_MS          Override cache TTL in milliseconds
  MARIGOLD_VALIDATE_DISABLED=1   Skip validation (exit immediately)
  MARIGOLD_TELEMETRY_DISABLED=1  Opt out of telemetry
  DO_NOT_TRACK=1                 Opt out of telemetry (standard)

See https://www.marigold-ui.io for component documentation.
`;

const isOutputFormat = (v: string): v is OutputFormat =>
  v === 'markdown' || v === 'json' || v === 'plain';

const isSection = (v: string): v is Section =>
  v === 'props' || v === 'usage' || v === 'examples' || v === 'all';

const isTelemetrySub = (v: string): v is TelemetrySubcommand =>
  v === 'status' || v === 'enable' || v === 'disable';

const isValidateChecks = (v: string): v is ValidateChecks =>
  v === 'technical' || v === 'spatial' || v === 'a11y' || v === 'all';

const isValidateFormat = (v: string): v is ValidateFormat =>
  v === 'json' || v === 'text';

// Thrown by `fail()` so the existing try/catch in `main()` can handle
// validation failures without bypassing the telemetry emit block.
class CliError extends Error {}

function fail(message: string): never {
  throw new CliError(message);
}

const parseDocsCommand = (argv: string[]) =>
  parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      section: { type: 'string' },
      format: { type: 'string' },
      fresh: { type: 'boolean', default: false },
      offline: { type: 'boolean', default: false },
    },
  });

const parseListCommand = (argv: string[]) =>
  parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      category: { type: 'string' },
      search: { type: 'string' },
      format: { type: 'string' },
      fresh: { type: 'boolean', default: false },
      offline: { type: 'boolean', default: false },
    },
  });

const parseSearchCommand = (argv: string[]) =>
  parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      limit: { type: 'string' },
      format: { type: 'string' },
      fresh: { type: 'boolean', default: false },
      offline: { type: 'boolean', default: false },
    },
  });

const parseExamplesCommand = (argv: string[]) =>
  parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      format: { type: 'string' },
      fresh: { type: 'boolean', default: false },
      offline: { type: 'boolean', default: false },
    },
  });

const parseValidateCommand = (argv: string[]) =>
  parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      checks: { type: 'string', default: 'all' },
      format: { type: 'string', default: 'text' },
    },
  });

const parseInitCommand = (argv: string[]) =>
  parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      yes: { type: 'boolean', default: false },
      'skip-install': { type: 'boolean', default: false },
    },
  });

const isExamplesSub = (v: string): v is ExamplesSubcommand =>
  (EXAMPLES_SUBCOMMANDS as readonly string[]).includes(v);

// Write command output, guaranteeing a single trailing newline so piped/captured
// output stays line-delimited regardless of what the renderer produced.
const writeOutput = (output: string): void => {
  process.stdout.write(output);
  if (!output.endsWith('\n')) process.stdout.write('\n');
};

export const main = async (
  argv: string[] = process.argv.slice(2)
): Promise<number> => {
  if (argv.length === 0 || argv[0] === '-h' || argv[0] === '--help') {
    process.stdout.write(help);
    return 0;
  }

  if (argv[0] === '-v' || argv[0] === '--version') {
    process.stdout.write(CLI_VERSION + '\n');
    return 0;
  }

  // Completion paths are handled before telemetry/dispatch wiring so they stay
  // fast and side-effect-free. `__complete` runs on every TAB press.
  if (argv[0] === '__complete') {
    const sepIdx = argv.indexOf('--');
    const words = sepIdx >= 0 ? argv.slice(sepIdx + 1) : argv.slice(1);
    process.stdout.write(runCompleteSuggest(words));
    return 0;
  }

  if (argv[0] === 'completion') {
    const result = runCompletion(argv[1]);
    const stream = result.exitCode === 0 ? process.stdout : process.stderr;
    stream.write(result.output);
    return result.exitCode;
  }

  const [command, ...rest] = argv;
  const startedAt = Date.now();
  let exitCode = 0;
  let cacheHit: boolean | undefined;
  let telemetryArgs: Record<string, string> | undefined;

  try {
    if (command === 'docs') {
      const { positionals, values } = parseDocsCommand(rest);
      const [componentInput] = positionals;

      // Record telemetry args before validation so failed runs still report
      // which flags were supplied.
      telemetryArgs = {
        component: componentInput ?? '',
        section: values.section ?? 'all',
        format: values.format ?? 'markdown',
        ...(values.fresh ? { fresh: 'true' } : {}),
        ...(values.offline ? { offline: 'true' } : {}),
      };

      if (!componentInput) fail('Usage: marigold docs <name-or-slug>');
      if (values.section && !isSection(values.section)) {
        fail(`Invalid --section: ${values.section}`);
      }
      if (values.format && !isOutputFormat(values.format)) {
        fail(`Invalid --format: ${values.format}`);
      }

      const result = await runDocs({
        component: componentInput,
        section: (values.section as Section | undefined) ?? 'all',
        format: (values.format as OutputFormat | undefined) ?? 'markdown',
        fresh: values.fresh,
        offline: values.offline,
      });

      writeOutput(result.output);
      cacheHit = result.cacheHit;
    } else if (command === 'list') {
      const { values } = parseListCommand(rest);

      telemetryArgs = {
        format: values.format ?? 'markdown',
        ...(values.category ? { category: values.category } : {}),
        ...(values.search ? { search: 'used' } : {}),
        ...(values.fresh ? { fresh: 'true' } : {}),
        ...(values.offline ? { offline: 'true' } : {}),
      };

      if (values.format && !isOutputFormat(values.format)) {
        fail(`Invalid --format: ${values.format}`);
      }

      const result = await runList({
        category: values.category,
        search: values.search,
        format: (values.format as OutputFormat | undefined) ?? 'markdown',
        fresh: values.fresh,
        offline: values.offline,
      });

      writeOutput(result.output);
      cacheHit = result.cacheHit;
    } else if (command === 'search') {
      const { positionals, values } = parseSearchCommand(rest);
      // Join positionals so both `search "field validation"` and the
      // unquoted `search field validation` resolve to the same query.
      const query = positionals.join(' ').trim();

      telemetryArgs = {
        format: values.format ?? 'markdown',
        ...(query ? { query: 'used' } : {}),
        ...(values.limit ? { limit: values.limit } : {}),
        ...(values.fresh ? { fresh: 'true' } : {}),
        ...(values.offline ? { offline: 'true' } : {}),
      };

      if (!query) fail('Usage: marigold search <query>');
      if (values.format && !isOutputFormat(values.format)) {
        fail(`Invalid --format: ${values.format}`);
      }
      let limit: number | undefined;
      if (values.limit !== undefined) {
        limit = Number(values.limit);
        if (!Number.isInteger(limit) || limit < 1) {
          fail(`Invalid --limit: ${values.limit} (must be a positive integer)`);
        }
      }

      const result = await runSearch({
        query,
        limit,
        format: (values.format as OutputFormat | undefined) ?? 'markdown',
        fresh: values.fresh,
        offline: values.offline,
      });

      writeOutput(result.output);
      cacheHit = result.cacheHit;
    } else if (command === 'examples') {
      const { positionals, values } = parseExamplesCommand(rest);
      const [sub, slug] = positionals;

      telemetryArgs = {
        sub: sub ?? '',
        format: values.format ?? 'markdown',
        ...(slug ? { slug } : {}),
        ...(values.fresh ? { fresh: 'true' } : {}),
        ...(values.offline ? { offline: 'true' } : {}),
      };

      if (!sub || !isExamplesSub(sub)) {
        fail('Usage: marigold examples <list|get> [slug]');
      }
      if (sub === 'list' && positionals.length > 1) {
        fail('Usage: marigold examples list (takes no arguments)');
      }
      if (sub === 'get' && !slug) {
        fail('Usage: marigold examples get <slug>');
      }
      if (sub === 'get' && positionals.length > 2) {
        fail('Usage: marigold examples get <slug>');
      }
      if (values.format && !isOutputFormat(values.format)) {
        fail(`Invalid --format: ${values.format}`);
      }

      const result = await runExamples({
        subcommand: sub,
        slug,
        format: (values.format as OutputFormat | undefined) ?? 'markdown',
        fresh: values.fresh,
        offline: values.offline,
      });

      writeOutput(result.output);
      cacheHit = result.cacheHit;
    } else if (command === 'validate') {
      // MARIGOLD_VALIDATE_DISABLED is enforced in one place — runValidate — so
      // the CLI and programmatic callers behave identically (it throws, which
      // this command's catch turns into a non-zero exit).
      const { positionals, values } = parseValidateCommand(rest);
      const [fileInput] = positionals;

      telemetryArgs = {
        checks: values.checks ?? 'all',
        format: values.format ?? 'markdown',
      };

      if (!fileInput) fail('Usage: marigold validate <file.tsx>');
      if (values.checks && !isValidateChecks(values.checks)) {
        fail(`Invalid --checks: ${values.checks}`);
      }
      if (values.format && !isValidateFormat(values.format)) {
        fail(`Invalid --format: ${values.format}`);
      }

      const { runValidate } = await import('../commands/validate.js');
      const result = await runValidate({
        file: fileInput,
        checks: (values.checks as ValidateChecks | undefined) ?? 'all',
        format: (values.format as ValidateFormat | undefined) ?? 'text',
      });

      process.stdout.write(result.output);
      if (!result.output.endsWith('\n')) process.stdout.write('\n');
      exitCode = result.hasErrors ? 1 : 0;
    } else if (command === 'init') {
      const { values } = parseInitCommand(rest);
      telemetryArgs = {
        ...(values.yes ? { yes: 'true' } : {}),
        ...(values['skip-install'] ? { skipInstall: 'true' } : {}),
      };
      // Lazy-load so @babel/parser, magic-string and @clack/prompts stay off
      // the docs/list hot path — those are the commands AI agents call
      // dozens of times per session.
      const { runInit } = await import('../commands/init.js');
      await runInit({
        yes: values.yes,
        skipInstall: values['skip-install'],
      });
    } else if (command === 'telemetry') {
      const [sub] = rest;
      telemetryArgs = sub ? { sub } : {};
      if (!sub || !isTelemetrySub(sub)) {
        fail('Usage: marigold telemetry <status|enable|disable>');
      }
      writeOutput(runTelemetry({ subcommand: sub }));
    } else {
      fail(`Unknown command: ${command}\n\nRun "marigold --help" for usage.`);
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'InitCancelError') {
      // User aborted `marigold init`. Surface SIGINT-style 130 so wrapping
      // scripts can distinguish abort from completion. The init flow already
      // printed "Aborted."; don't double-print.
      exitCode = 130;
    } else {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(pc.red(message) + '\n');
      exitCode = 1;
    }
  }

  // `completion` and `__complete` are filtered out — they return early above
  // and aren't included in telemetry by design.
  const commandForTelemetry =
    command !== 'completion' && (TOP_LEVEL_NAMES as string[]).includes(command)
      ? (command as Exclude<SubcommandName, 'completion'>)
      : null;
  if (commandForTelemetry) {
    emit({
      command: commandForTelemetry,
      cliVersion: CLI_VERSION,
      startedAt,
      exitCode,
      cacheHit,
      args: telemetryArgs,
    });
  }

  return exitCode;
};

// Only auto-invoke when this module is the entry point (i.e. the user ran
// `marigold ...`). When imported from tests, `main()` is awaited explicitly.
// Resolve symlinks on both sides: npm links a package's bin as a symlink, so
// process.argv[1] is `.../.bin/marigold` while import.meta.url is the real file.
// Comparing the raw paths would leave `main()` un-invoked — a silent no-op exit
// 0 — for `marigold`/`npx marigold` on an npm install. (pnpm's shim passes the
// real path, which is why this only bites npm consumers.)
const isEntryPoint = ((): boolean => {
  const argv1 = process.argv[1];
  if (!argv1) return false;
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(argv1);
  } catch {
    return false;
  }
})();
if (isEntryPoint) {
  main().then(
    code => process.exit(code),
    err => {
      process.stderr.write(String(err) + '\n');
      process.exit(1);
    }
  );
}
