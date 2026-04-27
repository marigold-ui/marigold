import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fetchWithCache } from './cache.js';

let tmpDir: string;
let originalCacheDir: string | undefined;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-cache-test-'));
  originalCacheDir = process.env.MARIGOLD_CACHE_DIR;
  process.env.MARIGOLD_CACHE_DIR = tmpDir;
});

afterEach(() => {
  if (originalCacheDir === undefined) delete process.env.MARIGOLD_CACHE_DIR;
  else process.env.MARIGOLD_CACHE_DIR = originalCacheDir;
  fs.rmSync(tmpDir, { recursive: true, force: true });
  vi.restoreAllMocks();
});

const mockFetch = (body: string, ok = true) => {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Server Error',
    text: async () => body,
  } as unknown as Response);
};

describe('fetchWithCache', () => {
  it('caches successful fetches', async () => {
    const spy = mockFetch('hello');
    const first = await fetchWithCache<string>('https://x/y', t => t);
    const second = await fetchWithCache<string>('https://x/y', t => t);
    expect(first.value).toBe('hello');
    expect(first.hit).toBe(false);
    expect(second.value).toBe('hello');
    expect(second.hit).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('bypasses cache with fresh=true', async () => {
    const spy = mockFetch('v1');
    await fetchWithCache<string>('https://x/z', t => t);
    spy.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: async () => 'v2',
    } as unknown as Response);
    const result = await fetchWithCache<string>('https://x/z', t => t, {
      fresh: true,
    });
    expect(result.value).toBe('v2');
    expect(result.hit).toBe(false);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('honors offline when cache exists', async () => {
    mockFetch('cached');
    await fetchWithCache<string>('https://x/a', t => t);
    const result = await fetchWithCache<string>('https://x/a', t => t, {
      offline: true,
      fresh: true, // even with fresh, offline should use cache
    });
    expect(result.value).toBe('cached');
  });

  it('throws in offline mode when no cache exists', async () => {
    await expect(
      fetchWithCache<string>('https://x/missing', t => t, { offline: true })
    ).rejects.toThrow(/Offline mode/);
  });

  it('throws on HTTP errors', async () => {
    mockFetch('fail', false);
    await expect(fetchWithCache<string>('https://x/e', t => t)).rejects.toThrow(
      /Failed to fetch/
    );
  });

  it('expires entries older than TTL', async () => {
    const spy = mockFetch('fresh');
    await fetchWithCache<string>('https://x/ttl', t => t, { ttlMs: 1 });
    // Sleep briefly; cache.ts reads mtime
    await new Promise(r => setTimeout(r, 5));
    const result = await fetchWithCache<string>('https://x/ttl', t => t, {
      ttlMs: 1,
    });
    expect(result.hit).toBe(false);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
