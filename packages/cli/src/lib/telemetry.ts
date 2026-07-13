import ci from 'ci-info';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
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
  | 'validate'
  | 'init'
  | 'telemetry';

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
  anonymousId: string;
}

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
  // Only mint an anonymous ID when opting in. `anonymousId()` lazy-mints on
  // `emit()` for the on-by-default path; opting out should never leave an
  // identifier on disk.
  if (enabled && !config.anonymousId) config.anonymousId = crypto.randomUUID();
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

const anonymousId = (): string => {
  const config = readConfig();
  if (config.anonymousId) return config.anonymousId;
  const id = crypto.randomUUID();
  writeConfig({ ...config, anonymousId: id });
  return id;
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

export const emit = (options: EmitOptions): void => {
  if (isTelemetryDisabled()) return;

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
    anonymousId: anonymousId(),
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
