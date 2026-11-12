import fs from 'node:fs';
import path from 'node:path';
import { declaredVersion, readPackageJson } from '../doctor/package-json.js';

// The applied-migrations marker: `"marigold": { "migrated": "v19" }` in the
// package.json that declares a Marigold package. It records the last
// migration applied, so `marigold migrate` never offers one twice (DST-1969).

// @marigold/system too, so a standalone theme package can be migrated
const PACKAGES = ['@marigold/components', '@marigold/system'];
const MIGRATION = /^v\d+$/;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * The nearest package.json at or above `targetPath` that declares
 * @marigold/components or @marigold/system, or null. Detection can stop at a
 * directory that only has node_modules (a hoisted monorepo root), so this
 * walks on its own.
 */
export const findMarkerFile = (targetPath: string): string | null => {
  let dir = path.resolve(targetPath);
  for (;;) {
    const file = path.join(dir, 'package.json');
    const pkg = readPackageJson(file);
    if (PACKAGES.some(name => declaredVersion(pkg, name))) return file;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
};

/** 'v19' -> 19 */
export const migrationMajor = (version: string): number =>
  Number.parseInt(version.replace(/^v/, ''), 10);

/** Whether the recorded migration already covers `version`. */
export const covers = (migrated: string | null, version: string): boolean =>
  migrated !== null && migrationMajor(migrated) >= migrationMajor(version);

// throws on a malformed value: guessing "nothing applied" would re-run a
// migration that is not safe to repeat
const migratedOf = (file: string, marigold: unknown): string | null => {
  if (!isPlainObject(marigold) || marigold.migrated === undefined) return null;
  const { migrated } = marigold;
  if (typeof migrated !== 'string' || !MIGRATION.test(migrated)) {
    throw new Error(
      `${file}: "marigold.migrated" is ${JSON.stringify(migrated)}, expected a migration like "v19". Fix or remove it, then run marigold migrate again.`
    );
  }
  return migrated;
};

/** The last applied migration recorded in `file`, or null when there is none. */
export const readMarker = (file: string): string | null => {
  const pkg: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  return isPlainObject(pkg) ? migratedOf(file, pkg.marigold) : null;
};

/**
 * Record `version` as the last applied migration in `file`, keeping its
 * indentation, line endings, trailing newline and key order. Never lowers
 * the marker: returns false, file untouched, when it already covers `version`.
 */
export const writeMarker = (file: string, version: string): boolean => {
  const raw = fs.readFileSync(file, 'utf8');
  const pkg: unknown = JSON.parse(raw);
  if (!isPlainObject(pkg)) {
    throw new Error(`${file}: not a JSON object, cannot record the migration`);
  }
  const existing = pkg.marigold;
  if (existing !== undefined && !isPlainObject(existing)) {
    throw new Error(
      `${file}: "marigold" is not an object, so the applied migration cannot be recorded there`
    );
  }
  if (covers(migratedOf(file, existing), version)) return false;

  pkg.marigold = { ...existing, migrated: version };

  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  // a one-line file stays one line
  const indent =
    /^[ \t]+(?=")/m.exec(raw)?.[0] ?? (raw.trim().includes('\n') ? '  ' : '');
  let output = JSON.stringify(pkg, null, indent);
  if (eol !== '\n') output = output.replace(/\n/g, eol);
  if (/\n$/.test(raw)) output += eol;
  fs.writeFileSync(file, output);
  return true;
};
