import { Project } from 'ts-morph';
import path from 'node:path';

let project: Project | null = null;

// process.cwd() is always the docs/ directory (Next.js or pnpm tsx)
export const DOCS_DIR = process.cwd();
const REPO_ROOT = path.resolve(DOCS_DIR, '..');

/**
 * Returns a shared ts-morph Project instance.
 * Uses lazy initialization to avoid loading TypeScript until actually needed.
 */
export function getSharedProject(): Project {
  if (!project) {
    project = new Project({
      tsConfigFilePath: path.join(REPO_ROOT, 'tsconfig.json'),
    });
  }
  return project;
}

/**
 * Resolves the path to a component's source file.
 * e.g. getComponentPath('Button') → '<root>/packages/components/src/Button/Button.tsx'
 */

export function getComponentPath(componentName: string): string {
  const relativePath = componentName.includes('/')
    ? `${componentName}.tsx`
    : `${componentName}/${componentName}.tsx`;
  return path.join(REPO_ROOT, `packages/components/src/${relativePath}`);
}
