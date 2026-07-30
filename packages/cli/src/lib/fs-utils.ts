import fs from 'node:fs';
import path from 'node:path';

export const exists = (p: string): boolean => {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
};

export const firstExisting = (
  cwd: string,
  candidates: readonly string[]
): string | null => {
  for (const c of candidates) {
    const full = path.join(cwd, c);
    if (exists(full)) return full;
  }
  return null;
};

// Conventional locations of the CSS entry point in Next.js / Vite projects.
// Used both for editing (lib/edit-css.ts) and Tailwind v4 detection
// (lib/detect-project.ts).
export const CSS_ENTRY_CANDIDATES = [
  'app/globals.css',
  'src/app/globals.css',
  'src/index.css',
  'styles/globals.css',
] as const;

// Conventional locations of a PostCSS config in Next.js projects, and the
// Tailwind v4 plugin that must be registered in it. Used both for writing
// (commands/init.ts) and build-wiring detection (lib/doctor/checks.ts), so the
// filenames and plugin name live in one place.
export const POSTCSS_CONFIG_CANDIDATES = [
  'postcss.config.mjs',
  'postcss.config.js',
  'postcss.config.cjs',
  'postcss.config.ts',
] as const;

export const TAILWIND_POSTCSS_PLUGIN = '@tailwindcss/postcss';
