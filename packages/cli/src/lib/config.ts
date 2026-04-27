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
  anonymousId?: string;
}

const configFile = () => path.join(configDir(), 'config.json');

export const readConfig = (): UserConfig => {
  try {
    const raw = fs.readFileSync(configFile(), 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object') {
      return parsed as UserConfig;
    }
    return {};
  } catch {
    return {};
  }
};

export const writeConfig = (config: UserConfig): void => {
  fs.mkdirSync(configDir(), { recursive: true });
  fs.writeFileSync(configFile(), JSON.stringify(config, null, 2) + '\n');
};
