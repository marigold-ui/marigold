import fs from 'node:fs';
import path from 'node:path';
import { declaredVersion, readPackageJson } from '../doctor/package-json.js';

// The applied-migrations marker: `"marigold": { "migrated": "v19" }` in the
// package.json that declares a Marigold package. It records the last
// migration applied, so `marigold migrate` never offers one twice (DST-1969).

// @marigold/system too, so a standalone theme package can be migrated
export const MARIGOLD_PACKAGES = [
  '@marigold/components',
  '@marigold/system',
] as const;
const MIGRATION = /^v\d+$/;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Whether the package.json at `file` declares a Marigold package. */
export const declaresMarigold = (file: string): boolean => {
  const pkg = readPackageJson(file);
  return MARIGOLD_PACKAGES.some(name => declaredVersion(pkg, name));
};

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
    if (declaresMarigold(file)) return file;
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

// Spans of an object's entries in validated JSON text, so the marker is
// spliced in and every other byte of the file stays as written.
interface ObjectSpans {
  open: number;
  close: number;
  entries: Map<string, { start: number; end: number }>;
  /** end of the last value, null for an empty object */
  lastEnd: number | null;
}

const skipWhitespace = (raw: string, i: number): number => {
  while (/\s/.test(raw[i] ?? '')) i++;
  return i;
};

const skipString = (raw: string, i: number): number => {
  i++;
  while (raw[i] !== '"') i += raw[i] === '\\' ? 2 : 1;
  return i + 1;
};

const skipValue = (raw: string, i: number): number => {
  if (raw[i] === '"') return skipString(raw, i);
  if (raw[i] === '{' || raw[i] === '[') {
    let depth = 0;
    for (;;) {
      const ch = raw[i];
      if (ch === '"') {
        i = skipString(raw, i);
        continue;
      }
      if (ch === '{' || ch === '[') depth++;
      if ((ch === '}' || ch === ']') && --depth === 0) return i + 1;
      i++;
    }
  }
  while (i < raw.length && !/[\s,}\]]/.test(raw[i])) i++;
  return i;
};

const objectAt = (raw: string, open: number): ObjectSpans => {
  const entries: ObjectSpans['entries'] = new Map();
  let lastEnd: number | null = null;
  let i = skipWhitespace(raw, open + 1);
  while (raw[i] !== '}') {
    const keyEnd = skipString(raw, i);
    const key = JSON.parse(raw.slice(i, keyEnd)) as string;
    const start = skipWhitespace(raw, skipWhitespace(raw, keyEnd) + 1);
    const end = skipValue(raw, start);
    entries.set(key, { start, end });
    lastEnd = end;
    i = skipWhitespace(raw, end);
    if (raw[i] === ',') i = skipWhitespace(raw, i + 1);
  }
  return { open, close: i, entries, lastEnd };
};

// `lead` goes before the entry, `closeLead` before `}` of an empty object
const insertEntry = (
  raw: string,
  object: ObjectSpans,
  entry: string,
  lead: string,
  closeLead: string
): string =>
  object.lastEnd === null
    ? raw.slice(0, object.open + 1) +
      lead +
      entry +
      closeLead +
      raw.slice(object.close)
    : raw.slice(0, object.lastEnd) +
      ',' +
      lead +
      entry +
      raw.slice(object.lastEnd);

/**
 * Record `version` as the last applied migration in `file`. Only the marker
 * is written: every other field keeps its formatting, and the file its line
 * endings and trailing newline. Never lowers the marker: returns false, file
 * untouched, when it already covers `version`.
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

  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  // a one-line file stays one line
  const multiline = raw.trim().includes('\n');
  const unit = /^[ \t]+(?=")/m.exec(raw)?.[0] ?? '  ';
  const colon = multiline ? ': ' : ':';
  const value = JSON.stringify(version);
  const root = objectAt(raw, skipWhitespace(raw, 0));
  const marker = root.entries.get('marigold');

  let output: string;
  if (!marker) {
    const object = multiline
      ? `{${eol}${unit}${unit}"migrated"${colon}${value}${eol}${unit}}`
      : `{"migrated"${colon}${value}}`;
    output = insertEntry(
      raw,
      root,
      `"marigold"${colon}${object}`,
      multiline ? eol + unit : '',
      multiline ? eol : ''
    );
  } else {
    const inner = objectAt(raw, marker.start);
    const migrated = inner.entries.get('migrated');
    if (migrated) {
      output = raw.slice(0, migrated.start) + value + raw.slice(migrated.end);
    } else {
      const nested = raw.slice(marker.start, marker.end).includes('\n');
      const space = multiline ? ' ' : '';
      output = insertEntry(
        raw,
        inner,
        `"migrated"${colon}${value}`,
        nested ? eol + unit + unit : space,
        nested ? eol + unit : space
      );
    }
  }
  fs.writeFileSync(file, output);
  return true;
};
