import fs from 'node:fs';
import path from 'node:path';
import type { PackageJson } from './types.js';

/** Read and parse a package.json. Returns null on missing/unreadable/malformed —
 * doctor must never throw on a broken consumer file. */
export const readPackageJson = (file: string): PackageJson | null => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as PackageJson;
  } catch {
    return null;
  }
};

/** Combined dependency map (dependencies + devDependencies) of a package.json. */
export const allDeps = (pkg: PackageJson | null): Record<string, string> => ({
  ...(pkg?.dependencies ?? {}),
  ...(pkg?.devDependencies ?? {}),
});

/** The declared version range for a dependency, or null if not declared. */
export const declaredVersion = (
  pkg: PackageJson | null,
  name: string
): string | null => allDeps(pkg)[name] ?? null;

/** Read the installed package.json for a dependency from the consumer's
 * node_modules. Returns null if the package isn't installed. */
export const readInstalled = (cwd: string, name: string): PackageJson | null =>
  readPackageJson(path.join(cwd, 'node_modules', name, 'package.json'));

/** The installed (on-disk) version of a dependency, or null if not installed. */
export const installedVersion = (cwd: string, name: string): string | null =>
  readInstalled(cwd, name)?.version ?? null;
