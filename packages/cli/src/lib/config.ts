import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_DOCS_URL = 'https://www.marigold-ui.io';
const DEFAULT_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export const docsUrl = (): string =>
  process.env.MARIGOLD_DOCS_URL?.replace(/\/$/, '') ?? DEFAULT_DOCS_URL;

export const cacheTtlMs = (): number => {
  const raw = process.env.MARIGOLD_CACHE_TTL_MS;
  if (!raw) return DEFAULT_CACHE_TTL_MS;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_CACHE_TTL_MS;
};

const xdgCacheHome = (): string => {
  if (process.platform === 'win32') {
    return (
      process.env.LOCALAPPDATA ?? path.join(os.homedir(), 'AppData', 'Local')
    );
  }
  return process.env.XDG_CACHE_HOME ?? path.join(os.homedir(), '.cache');
};

const xdgConfigHome = (): string => {
  if (process.platform === 'win32') {
    return process.env.APPDATA ?? path.join(os.homedir(), 'AppData', 'Roaming');
  }
  return process.env.XDG_CONFIG_HOME ?? path.join(os.homedir(), '.config');
};

export const cacheDir = (): string =>
  process.env.MARIGOLD_CACHE_DIR ?? path.join(xdgCacheHome(), 'marigold');

export const configDir = (): string =>
  process.env.MARIGOLD_CONFIG_DIR ?? path.join(xdgConfigHome(), 'marigold');

export interface UserConfig {
  telemetryEnabled?: boolean;
  // Set once the first-run telemetry disclosure has been printed, so the notice
  // shows exactly once per machine.
  telemetryNoticeShown?: boolean;
}

// Keys this CLI has written in the past but no longer uses. `readConfig` strips
// them so a stale value can never be read back or re-persisted.
//
// `anonymousId` was a persistent per-machine UUID sent with every telemetry
// event. It made the payload personal data under GDPR (a pseudonymous
// identifier is not anonymous, Recital 26) and turned the config write into
// "storage on terminal equipment" requiring consent under ePrivacy Art. 5(3) /
// § 25 TDDDG. Telemetry is now identifier-free, so the key is dropped on the
// next config read.
const REMOVED_CONFIG_KEYS = ['anonymousId'] as const;

const configFile = () => path.join(configDir(), 'config.json');

export const readConfig = (): UserConfig => {
  try {
    const raw = fs.readFileSync(configFile(), 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};

    const config = { ...parsed } as UserConfig & Record<string, unknown>;
    const stale = REMOVED_CONFIG_KEYS.filter(key => key in config);
    if (stale.length === 0) return config;

    // Erase retired keys from the in-memory config so they can never be read
    // back, then rewrite the file to remove them from disk too. This is a write
    // from a read path, but it fires at most once per machine (the next read
    // finds nothing stale) and self-heals configs written by older versions.
    for (const key of stale) delete config[key];
    try {
      writeConfig(config);
    } catch {
      // Read must still succeed if the prune write fails (read-only FS, etc).
    }
    return config;
  } catch {
    return {};
  }
};

export const writeConfig = (config: UserConfig): void => {
  fs.mkdirSync(configDir(), { recursive: true });
  fs.writeFileSync(configFile(), JSON.stringify(config, null, 2) + '\n');
};
