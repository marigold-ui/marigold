import { Project } from 'ts-morph';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let project: Project | null = null;

// Stable root: docs/app/mcp/plugins/project.ts → 4 levels up = repo root
const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../..'
);

// docs dir for UI file references
export const DOCS_DIR = path.resolve(REPO_ROOT, 'docs');

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
