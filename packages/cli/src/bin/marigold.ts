#!/usr/bin/env node
import pc from 'picocolors';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { runDocs } from '../commands/docs.js';
import { runInit } from '../commands/init.js';
import { runList } from '../commands/list.js';
import {
  type TelemetrySubcommand,
  runTelemetry,
} from '../commands/telemetry.js';
import type { Section } from '../lib/docs.js';
import type { OutputFormat } from '../lib/format.js';
import { emit } from '../lib/telemetry.js';

const readCliVersion = (): string => {
  try {
    const here = fileURLToPath(import.meta.url);
    // dist/bin/marigold.mjs → package.json is two directories up
    const pkg = JSON.parse(
      readFileSync(
        path.join(path.dirname(here), '..', '..', 'package.json'),
        'utf8'
      )
    ) as { version?: string };
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
};

const CLI_VERSION = readCliVersion();

const help = `
${pc.bold('marigold')} — Marigold Design System CLI

${pc.bold('Usage:')}
  marigold <command> [options]

${pc.bold('Commands:')}
  docs <Component>    Fetch component documentation
  list                List available components
  init                Set up Marigold in a project
  telemetry <action>  Manage telemetry (status|enable|disable)

${pc.bold('Docs options:')}
  --section <name>    props | usage | examples | all (default: all)
  --format  <name>    markdown | json | plain (default: markdown)
  --fresh             Bypass the local cache
  --offline           Use only the local cache

${pc.bold('List options:')}
  --category <name>   Filter by category (actions, form, layout, ...)
  --search   <term>   Filter by name
  --format   <name>   markdown | json | plain

${pc.bold('Init options:')}
  --yes               Skip confirmation prompts
  --skip-install      Don't run the package install step

${pc.bold('Environment:')}
  MARIGOLD_DOCS_URL              Override docs site base URL
  MARIGOLD_CACHE_TTL_MS          Override cache TTL in milliseconds
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

function fail(message: string): never {
  process.stderr.write(pc.red(message) + '\n');
  process.exit(1);
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

const parseInitCommand = (argv: string[]) =>
  parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      yes: { type: 'boolean', default: false },
      'skip-install': { type: 'boolean', default: false },
    },
  });

const main = async (): Promise<number> => {
  const argv = process.argv.slice(2);

  if (argv.length === 0 || argv[0] === '-h' || argv[0] === '--help') {
    process.stdout.write(help);
    return 0;
  }

  if (argv[0] === '-v' || argv[0] === '--version') {
    process.stdout.write(CLI_VERSION + '\n');
    return 0;
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
      if (!componentInput) fail('Usage: marigold docs <ComponentName>');

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

      process.stdout.write(result.output);
      if (!result.output.endsWith('\n')) process.stdout.write('\n');
      cacheHit = result.cacheHit;
      telemetryArgs = {
        ...(values.section ? { section: values.section } : {}),
        ...(values.format ? { format: values.format } : {}),
      };
    } else if (command === 'list') {
      const { values } = parseListCommand(rest);

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

      process.stdout.write(result.output);
      telemetryArgs = {
        ...(values.category ? { category: values.category } : {}),
        ...(values.search ? { search: 'used' } : {}),
        ...(values.format ? { format: values.format } : {}),
      };
    } else if (command === 'init') {
      const { values } = parseInitCommand(rest);
      await runInit({
        yes: values.yes,
        skipInstall: values['skip-install'],
      });
    } else if (command === 'telemetry') {
      const [sub] = rest;
      if (!sub || !isTelemetrySub(sub)) {
        fail('Usage: marigold telemetry <status|enable|disable>');
      }
      const output = runTelemetry({ subcommand: sub });
      process.stdout.write(output);
      telemetryArgs = { sub };
    } else {
      fail(`Unknown command: ${command}\n\nRun "marigold --help" for usage.`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(pc.red(message) + '\n');
    exitCode = 1;
  }

  const commandForTelemetry =
    command === 'docs' ||
    command === 'list' ||
    command === 'init' ||
    command === 'telemetry'
      ? command
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

main().then(
  code => process.exit(code),
  err => {
    process.stderr.write(String(err) + '\n');
    process.exit(1);
  }
);
