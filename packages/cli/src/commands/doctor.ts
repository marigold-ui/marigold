import { runDoctorChecks } from '../lib/doctor/index.js';
import { loadManifest } from '../lib/manifest.js';

export type DoctorFormat = 'text' | 'json';

// Short, best-effort budget for warming the manifest cache. Doctor is a
// diagnostic run, not a hot path, but it should never hang on a slow network —
// if the fetch doesn't land quickly the freshness check just falls back to
// whatever is already cached.
const MANIFEST_WARM_TIMEOUT_MS = 2500;

export interface RunDoctorOptions {
  cwd?: string;
  format?: DoctorFormat;
  /** Skip the network entirely; freshness relies on the local cache only. */
  offline?: boolean;
}

export interface RunDoctorResult {
  output: string;
  hasErrors: boolean;
}

export const isDoctorFormat = (v: string): v is DoctorFormat =>
  v === 'text' || v === 'json';

export const runDoctor = async (
  options: RunDoctorOptions = {}
): Promise<RunDoctorResult> => {
  const cwd = options.cwd ?? process.cwd();

  // Best-effort: warm the manifest cache so the freshness check has published
  // versions to compare against on a first run, without the user having to
  // prime it via another command. The check itself stays cache-only; this only
  // populates the cache. Never fatal — offline, a slow/failed fetch, or a
  // manifest without a `packages` field all degrade to the cache-only path,
  // where freshness simply skips.
  if (!options.offline) {
    try {
      await loadManifest({ timeoutMs: MANIFEST_WARM_TIMEOUT_MS });
    } catch {
      // network unavailable/slow/non-200 — freshness degrades to cache-only
    }
  }

  const report = runDoctorChecks(cwd);
  const output =
    (options.format ?? 'text') === 'json'
      ? JSON.stringify(report, null, 2)
      : report.text;
  return { output, hasErrors: report.errors.length > 0 };
};
