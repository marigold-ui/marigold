import ci from 'ci-info';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { docsUrl, readConfig, writeConfig } from './config.js';
import { firstExisting } from './fs-utils.js';

export type CommandName =
  | 'docs'
  | 'list'
  | 'search'
  | 'examples'
  | 'init'
  | 'doctor'
  | 'migrate'
  | 'telemetry';

// Deliberately identifier-free: no per-machine UUID, no session ID, no IP is
// persisted server-side. Every field below is a low-cardinality property of the
// *invocation*, not of the user, so events cannot be linked into a per-user
// history. That keeps the payload outside "personal data" (GDPR Art. 4(1)) and
// keeps the CLI from storing an identifier on the user's device, which would
// require consent under ePrivacy Art. 5(3) / § 25 TDDDG.
//
// The cost of this is real and accepted: we can count invocations, not people.
// Unique-user numbers come from npm download stats instead.
export interface TelemetryEvent {
  event: 'cli_command';
  command: CommandName;
  cliVersion: string;
  nodeVersion: string;
  platform: string;
  isTTY: boolean;
  isAIAgent: boolean;
  durationBucket: '0-100' | '100-500' | '500-2000' | '2000+';
  exitCode: number;
  cacheHit?: boolean;
  args?: Record<string, string>;
}

// `args` must stay low-cardinality and must never echo prose a user typed. The
// two helpers below are the only sanctioned way to build it, so an unvalidated
// value can't reach the wire by omission at a call site.

// Identifier-shaped values only — component names, page/example slugs,
// categories. Anything else (a stray sentence, a path, an over-long string)
// collapses to 'invalid' rather than being forwarded verbatim.
const SLUG_PATTERN = /^[A-Za-z0-9][A-Za-z0-9/._-]{0,63}$/;

export const slugArg = (value: string | undefined): string => {
  if (!value) return '';
  return SLUG_PATTERN.test(value) ? value : 'invalid';
};

// Clamp a flag to its documented enum. Call sites record telemetry args before
// validation (so failed runs still report which flags were supplied), which
// previously meant a mistyped `--format=jsonn` was sent as-is; now it lands as
// 'invalid'.
export const enumArg = (
  value: string | undefined,
  allowed: readonly string[],
  fallback: string
): string => {
  if (value === undefined) return fallback;
  return allowed.includes(value) ? value : 'invalid';
};

const bucketDuration = (ms: number): TelemetryEvent['durationBucket'] => {
  if (ms < 100) return '0-100';
  if (ms < 500) return '100-500';
  if (ms < 2000) return '500-2000';
  return '2000+';
};

const detectAIAgent = (): boolean =>
  Boolean(
    process.env.CLAUDECODE ||
    process.env.CURSOR_AGENT ||
    process.env.VSCODE_AGENT ||
    process.env.CODEX_SANDBOX ||
    process.env.AI_AGENT
  );

export const isTelemetryDisabled = (): boolean => {
  if (process.env.MARIGOLD_TELEMETRY_DISABLED === '1') return true;
  if (process.env.DO_NOT_TRACK === '1') return true;
  if (ci.isCI) return true;
  const config = readConfig();
  if (config.telemetryEnabled === false) return true;
  return false;
};

export const setTelemetryEnabled = (enabled: boolean): void => {
  const config = readConfig();
  config.telemetryEnabled = enabled;
  writeConfig(config);
};

export const telemetryStatus = ():
  | 'enabled'
  | 'disabled'
  | 'ci-suppressed'
  | 'env-suppressed' => {
  if (process.env.MARIGOLD_TELEMETRY_DISABLED === '1') return 'env-suppressed';
  if (process.env.DO_NOT_TRACK === '1') return 'env-suppressed';
  if (ci.isCI) return 'ci-suppressed';
  const config = readConfig();
  return config.telemetryEnabled === false ? 'disabled' : 'enabled';
};

export interface EmitOptions {
  command: CommandName;
  cliVersion: string;
  startedAt: number;
  exitCode: number;
  cacheHit?: boolean;
  args?: Record<string, string>;
}

const findSenderScript = (): string | null => {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  // ESM build: dist/lib/telemetry.mjs → dist/lib/send-telemetry.mjs
  // CJS build: dist/lib/telemetry.cjs → dist/lib/send-telemetry.cjs
  return firstExisting(dir, ['send-telemetry.mjs', 'send-telemetry.cjs']);
};

const TMP_SWEEP_MAX_AGE_MS = 24 * 60 * 60 * 1000;

// Best-effort cleanup of stale telemetry tmp files in os.tmpdir(). The
// detached sender unlinks on success, but if the child dies before reaching
// unlink the file leaks; this sweep keeps the tmpdir bounded for a frequently
// invoked CLI. Wrapped in try/catch and uses sync I/O so it stays cheap and
// never throws.
const sweepStaleTelemetryTmpFiles = (): void => {
  try {
    const dir = os.tmpdir();
    const now = Date.now();
    for (const entry of fs.readdirSync(dir)) {
      if (!entry.startsWith('marigold-telemetry-') || !entry.endsWith('.json'))
        continue;
      const full = path.join(dir, entry);
      try {
        const stat = fs.statSync(full);
        if (now - stat.mtimeMs > TMP_SWEEP_MAX_AGE_MS) fs.unlinkSync(full);
      } catch {
        // ignore — file may have been removed by another process
      }
    }
  } catch {
    // tmpdir unreadable or missing — telemetry must never throw
  }
};

// The disclosure lives in the `marigold telemetry` section of the CLI page
// rather than on a page of its own — a standalone privacy page is one nobody
// navigates to, whereas this anchor sits where people already are when they
// look up the command.
export const TELEMETRY_NOTICE_URL =
  'https://www.marigold-ui.io/getting-started/cli#marigold-telemetry';

// First-run disclosure for interactive users. Printed to stderr so it never
// pollutes stdout/JSON output that AI agents parse, and only on a TTY — a
// notice written into a pipe is read by nobody, so persisting the "shown" flag
// on a silent run would burn the one-time disclosure without informing anyone.
//
// Non-interactive runs are covered instead by the always-available surfaces:
// `marigold --help`, the README, and the linked telemetry page. That split is
// only defensible because the payload carries no identifier — see
// `TelemetryEvent`. If an identifying field is ever added back, this notice
// stops being sufficient and the default must flip to opt-in.
//
// Every claim here must stay true to what `emit()` actually sends. Returns true
// when the notice was just shown, so the caller can skip tracking that one
// invocation and let the reader opt out before anything is sent.
const showFirstRunNoticeIfNeeded = (): boolean => {
  try {
    const config = readConfig();
    if (config.telemetryNoticeShown) return false;
    if (!process.stderr.isTTY) return false;

    process.stderr.write(
      [
        '',
        'Marigold CLI reports anonymous usage data to help improve the tool:',
        'the command run, its flags, which component or page you asked for,',
        'CLI/Node version, OS, exit code, and a coarse duration bucket.',
        'No identifier is attached, so runs cannot be linked to you or to each',
        'other. Search terms, file contents, and code are never sent.',
        `Details: ${TELEMETRY_NOTICE_URL}`,
        'Opt out any time: `marigold telemetry disable` or DO_NOT_TRACK=1',
        '',
      ].join('\n') + '\n'
    );
    writeConfig({ ...config, telemetryNoticeShown: true });
    return true;
  } catch {
    // Notice must never break the CLI.
    return false;
  }
};

export const emit = (options: EmitOptions): void => {
  if (isTelemetryDisabled()) return;

  // Don't track the invocation that first disclosed telemetry — give the user a
  // chance to opt out before any data leaves the machine.
  if (showFirstRunNoticeIfNeeded()) return;
  sweepStaleTelemetryTmpFiles();

  const event: TelemetryEvent = {
    event: 'cli_command',
    command: options.command,
    cliVersion: options.cliVersion,
    nodeVersion: process.version,
    platform: process.platform,
    isTTY: Boolean(process.stdout.isTTY),
    isAIAgent: detectAIAgent(),
    durationBucket: bucketDuration(Date.now() - options.startedAt),
    exitCode: options.exitCode,
    cacheHit: options.cacheHit,
    args: options.args,
  };

  const script = findSenderScript();
  if (!script) return;

  try {
    const tmpFile = path.join(
      os.tmpdir(),
      `marigold-telemetry-${process.pid}-${Date.now()}.json`
    );
    fs.writeFileSync(
      tmpFile,
      JSON.stringify({ url: `${docsUrl()}/api/telemetry`, event })
    );

    const child = spawn(process.execPath, [script, tmpFile], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    });
    child.unref();
  } catch {
    // Telemetry must never break the CLI.
  }
};
