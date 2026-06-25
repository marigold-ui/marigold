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

// Thrown when a fetch completes but the response is not ok, carrying the HTTP
// status as a structured field. Callers branch on `err.status` (e.g. a 404 →
// friendlier guidance) instead of parsing the error message string.
export class FetchError extends Error {
  readonly status: number;
  constructor(url: string, status: number, statusText: string) {
    super(`Failed to fetch ${url}: ${status} ${statusText}`);
    this.name = 'FetchError';
    this.status = status;
  }
}

const safeKey = (key: string): string =>
  crypto.createHash('sha256').update(key).digest('hex').slice(0, 32);

const entryPath = (key: string, ext: string): string =>
  path.join(cacheDir(), `${safeKey(key)}.${ext}`);

export const cachePathFor = (url: string): string => entryPath(url, 'cache');

export const readCacheSync = (url: string): string | null => {
  try {
    return fs.readFileSync(cachePathFor(url), 'utf8');
  } catch {
    return null;
  }
};

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
  // Write-then-rename so concurrent CLI invocations can't observe a
  // half-written file. rename(2) is atomic on POSIX. The .pid suffix avoids
  // races between sibling processes writing the same cache key.
  const tmp = `${file}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, data);
    fs.renameSync(tmp, file);
  } catch (err) {
    try {
      fs.unlinkSync(tmp);
    } catch {
      // ignore — best-effort cleanup
    }
    throw err;
  }
};

export const fetchWithCache = async <T = string>(
  url: string,
  parse: (text: string) => T,
  options: CacheOptions = {}
): Promise<CachedResult<T>> => {
  const ttl = options.ttlMs ?? cacheTtlMs();
  // `MARIGOLD_CACHE_TTL_MS=0` means caching disabled: skip read+write
  // entirely rather than writing an entry that the next call will treat
  // as immediately stale.
  const cachingDisabled = ttl === 0;
  const file = entryPath(url, 'cache');

  if (!options.fresh && !cachingDisabled) {
    const cached = readEntry(file, ttl);
    if (cached !== null) {
      try {
        return { value: parse(cached), hit: true };
      } catch {
        // Cached data is unparseable — drop it and fall through to refetch.
        try {
          fs.unlinkSync(file);
        } catch {
          // ignore
        }
      }
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

  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      throw new Error(
        `Timed out fetching ${url} after 10s. Check your network or use --offline.`,
        { cause: err }
      );
    }
    throw err;
  }
  if (!response.ok) {
    throw new FetchError(url, response.status, response.statusText);
  }
  const text = await response.text();
  let value: T;
  try {
    value = parse(text);
  } catch (err) {
    const contentType = response.headers.get('content-type') ?? 'unknown';
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Could not parse response from ${url} (content-type: ${contentType}). ` +
        `The endpoint may be returning an HTML page instead of the expected payload. ${detail}`,
      { cause: err }
    );
  }
  if (!cachingDisabled) writeEntry(file, text);
  return { value, hit: false };
};
