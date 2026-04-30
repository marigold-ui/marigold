import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { cacheDir, cacheTtlMs } from './config.js';

export interface CacheOptions {
  fresh?: boolean;
  offline?: boolean;
  ttlMs?: number;
}

export interface CachedResult<T> {
  value: T;
  hit: boolean;
}

const safeKey = (key: string): string =>
  crypto.createHash('sha256').update(key).digest('hex').slice(0, 32);

const entryPath = (key: string, ext: string): string =>
  path.join(cacheDir(), `${safeKey(key)}.${ext}`);

const readEntry = (file: string, ttl: number): string | null => {
  try {
    const stat = fs.statSync(file);
    if (Date.now() - stat.mtimeMs > ttl) return null;
    return fs.readFileSync(file, 'utf8');
  } catch {
    return null;
  }
};

const writeEntry = (file: string, data: string): void => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

export const fetchWithCache = async <T = string>(
  url: string,
  parse: (text: string) => T,
  options: CacheOptions = {}
): Promise<CachedResult<T>> => {
  const ttl = options.ttlMs ?? cacheTtlMs();
  const file = entryPath(url, 'cache');

  if (!options.fresh) {
    const cached = readEntry(file, ttl);
    if (cached !== null) {
      return { value: parse(cached), hit: true };
    }
  }

  if (options.offline) {
    const cached = readEntry(file, Number.POSITIVE_INFINITY);
    if (cached !== null) {
      return { value: parse(cached), hit: true };
    }
    throw new Error(
      `Offline mode requested but no cached data for ${url}. Run without --offline first.`
    );
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }
  const text = await response.text();
  writeEntry(file, text);
  return { value: parse(text), hit: false };
};
