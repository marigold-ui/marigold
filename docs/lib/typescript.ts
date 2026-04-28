import type { Generator } from 'fumadocs-typescript';
import type { Project } from 'ts-morph';
import path from 'node:path';

export const DOCS_DIR = process.cwd();
const REPO_ROOT = path.resolve(DOCS_DIR, '..');
const TSCONFIG_PATH = path.join(REPO_ROOT, 'tsconfig.json');

// Cache lives under .next/cache so Vercel preserves it across deploys.
const CACHE_DIR = '.next/cache/fumadocs-typescript';

let singleton: Promise<{ generator: Generator; project: Project }> | undefined;

// Dynamic import required: fumadocs-typescript is ESM-only but `tsx` runs
// build-md.ts in CJS mode — a static import would crash the build.
const init = () =>
  (singleton ??= (async () => {
    const fumaTs = await import('fumadocs-typescript');
    const project = await fumaTs.createProject({ tsconfigPath: TSCONFIG_PATH });
    const generator = fumaTs.createGenerator({
      project,
      cache: fumaTs.createFileSystemGeneratorCache(CACHE_DIR),
      tsconfigPath: TSCONFIG_PATH,
    });
    return { project, generator };
  })());

export const getGenerator = async (): Promise<Generator> =>
  (await init()).generator;

export const getProject = async (): Promise<Project> => (await init()).project;

export interface ResolveComponentPathOptions {
  path: string;
  package?: 'components' | 'system';
}

export const resolveComponentPath = ({
  path: componentPath,
  package: pkg = 'components',
}: ResolveComponentPathOptions): string => {
  const baseDir = path.join(REPO_ROOT, `packages/${pkg}/src`);
  const isBareComponentName = !componentPath.includes('/');

  let cleanPath = componentPath;
  if (pkg === 'system' && !cleanPath.startsWith('components/')) {
    cleanPath = `components/${cleanPath}`;
  }

  if (cleanPath.endsWith('.tsx')) return path.join(baseDir, cleanPath);

  if (cleanPath.includes('/')) {
    // For system package bare names, the folder was added above — keep the
    // original name as the file stem (e.g. "SVG" → components/SVG/SVG.tsx).
    return isBareComponentName && pkg === 'system'
      ? path.join(baseDir, cleanPath, `${componentPath}.tsx`)
      : path.join(baseDir, `${cleanPath}.tsx`);
  }

  return path.join(baseDir, cleanPath, `${cleanPath}.tsx`);
};
