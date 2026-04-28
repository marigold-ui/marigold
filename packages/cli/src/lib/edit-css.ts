import fs from 'node:fs';
import path from 'node:path';
import type { Framework } from './detect-project.js';

export type CssEditOutcome =
  | { kind: 'edited'; path: string; created: boolean; added: string[] }
  | { kind: 'unchanged'; path: string }
  | { kind: 'skipped'; reason: string };

const CSS_CANDIDATES = [
  'app/globals.css',
  'src/app/globals.css',
  'src/index.css',
  'styles/globals.css',
];

const exists = (p: string): boolean => {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
};

const findExistingCssFile = (cwd: string): string | null => {
  for (const c of CSS_CANDIDATES) {
    const full = path.join(cwd, c);
    if (exists(full)) return full;
  }
  return null;
};

const defaultCssPath = (cwd: string, framework: Framework): string => {
  if (framework === 'nextjs') {
    if (exists(path.join(cwd, 'src/app'))) {
      return path.join(cwd, 'src/app/globals.css');
    }
    return path.join(cwd, 'app/globals.css');
  }
  return path.join(cwd, 'src/index.css');
};

const computeSourcePath = (cssAbs: string, cwd: string): string => {
  const rel = path.relative(
    path.dirname(cssAbs),
    path.join(cwd, 'node_modules/@marigold')
  );
  return rel.startsWith('.') ? rel : `./${rel}`;
};

const hasImport = (contents: string, target: string): boolean => {
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`@import\\s+["']${escaped}["'];?`, 'm').test(contents);
};

const hasSource = (contents: string, sourcePath: string): boolean => {
  const escaped = sourcePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`@source\\s+["']${escaped}["'];?`, 'm').test(contents);
};

export interface CssEditOptions {
  cwd: string;
  framework: Framework;
}

export const editCss = (options: CssEditOptions): CssEditOutcome => {
  const { cwd, framework } = options;
  const existing = findExistingCssFile(cwd);
  const target = existing ?? defaultCssPath(cwd, framework);

  const created = !existing;
  const original = existing ? fs.readFileSync(existing, 'utf8') : '';
  const sourcePath = computeSourcePath(target, cwd);

  const lines: string[] = [];
  const added: string[] = [];

  if (!hasImport(original, 'tailwindcss')) {
    lines.push(`@import 'tailwindcss';`);
    added.push('tailwindcss import');
  }
  if (!hasImport(original, '@marigold/theme-rui/theme.css')) {
    lines.push(`@import '@marigold/theme-rui/theme.css';`);
    added.push('marigold theme import');
  }
  if (!hasSource(original, sourcePath)) {
    lines.push(`@source '${sourcePath}';`);
    added.push('@source directive');
  }

  if (lines.length === 0) {
    return { kind: 'unchanged', path: target };
  }

  const block = lines.join('\n');
  const trimmedOriginal = original.replace(/^\s+/, '');
  const leadingWhitespace = original.slice(
    0,
    original.length - trimmedOriginal.length
  );

  const next = trimmedOriginal
    ? `${leadingWhitespace}${block}\n\n${trimmedOriginal}`
    : `${block}\n`;

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, next);

  return { kind: 'edited', path: target, created, added };
};
