import ci from 'ci-info';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { docsUrl, readConfig, writeConfig } from './config.js';

export type CommandName = 'docs' | 'list' | 'init' | 'telemetry';

export interface TelemetryEvent {
  event: 'cli_command';
  command: CommandName;
  cliVersion: string;
  nodeVersion: string;
  platform: string;
  isCI: boolean;
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
  if (!config.anonymousId) config.anonymousId = crypto.randomUUID();
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
  const here = fileURLToPath(import.meta.url);
  const candidates = [
    // ESM build: dist/lib/telemetry.mjs → dist/lib/send-telemetry.mjs
    path.join(path.dirname(here), 'send-telemetry.mjs'),
    // CJS build: dist/lib/telemetry.cjs → dist/lib/send-telemetry.cjs
    path.join(path.dirname(here), 'send-telemetry.cjs'),
  ];
  for (const file of candidates) {
    try {
      fs.accessSync(file);
      return file;
    } catch {
      // try next
    }
  }
  return null;
};

export const emit = (options: EmitOptions): void => {
  if (isTelemetryDisabled()) return;

  const event: TelemetryEvent = {
    event: 'cli_command',
    command: options.command,
    cliVersion: options.cliVersion,
    nodeVersion: process.version,
    platform: process.platform,
    isCI: ci.isCI,
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
