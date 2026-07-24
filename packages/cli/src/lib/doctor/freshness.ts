import { loadManifestSync } from '../manifest.js';

// Best-effort latest-version lookup. Reads ONLY the local manifest cache
// (loadManifestSync never throws and never touches the network), so doctor stays
// filesystem-only, offline-safe, and fast in CI. Returns null when the manifest
// isn't cached or predates the `packages` field — the freshness check is then
// omitted entirely rather than warning on unknown data.
export const latestVersions = (): Record<string, string> | null => {
  const manifest = loadManifestSync();
  const packages = manifest?.packages;
  if (!packages || Object.keys(packages).length === 0) return null;
  return packages;
};
