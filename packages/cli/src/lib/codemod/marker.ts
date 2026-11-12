import fs from 'node:fs';
import path from 'node:path';
import { declaredVersion, readPackageJson } from '../doctor/package-json.js';

// The applied-migrations marker: `"marigold": { "migrated": "v19" }` in the
// package.json that declares @marigold/components. It records the last
// migration applied, so `marigold migrate` never offers one twice (DST-1969).

const PACKAGE = '@marigold/components';
const MIGRATION = /^v\d+$/;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * The nearest package.json at or above `targetPath` that declares
 * @marigold/components, or null. Detection can stop at a directory that only
 * has node_modules (a hoisted monorepo root), so this walks on its own.
 */
export const findMarkerFile = (targetPath: string): string | null => {
  let dir = path.resolve(targetPath);
  for (;;) {
    const file = path.join(dir, 'package.json');
    if (declaredVersion(readPackageJson(file), PACKAGE)) return file;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
};

/**
 * The last applied migration recorded in `file`, or null when there is none.
 * Throws on a malformed value: guessing "nothing applied" would re-run a
 * migration that is not safe to repeat.
 */
export const readMarker = (file: string): string | null => {
  const pkg: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!isPlainObject(pkg) || !isPlainObject(pkg.marigold)) return null;
  const { migrated } = pkg.marigold;
  if (migrated === undefined) return null;
  if (typeof migrated !== 'string' || !MIGRATION.test(migrated)) {
    throw new Error(
      `${file}: "marigold.migrated" is ${JSON.stringify(migrated)}, expected a migration like "v19". Fix or remove it, then run marigold migrate again.`
    );
  }
  return migrated;
};

/**
 * Record `version` as the last applied migration in `file`, keeping its
 * indentation, line endings, trailing newline and key order. Returns false
 * when it was already recorded and the file was left untouched.
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
  if (existing?.migrated === version) return false;

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
