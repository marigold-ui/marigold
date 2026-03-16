import { Project } from 'ts-morph';
import path from 'node:path';

let project: Project | null = null;

/**
 * Returns a shared ts-morph Project instance.
 * Uses lazy initialization to avoid loading TypeScript until actually needed.
 */
export function getSharedProject(): Project {
  if (!project) {
    project = new Project({
      tsConfigFilePath: path.resolve(process.cwd(), '../tsconfig.json'),
    });
  }
  return project;
}

/**
 * Resolves the path to a component's source file.
 * e.g. getComponentPath('Button') → '<root>/packages/components/src/Button/Button.tsx'
 */
export function getComponentPath(componentName: string): string {
  return path.resolve(
    process.cwd(),
    `../packages/components/src/${componentName}/${componentName}.tsx`
  );
}
