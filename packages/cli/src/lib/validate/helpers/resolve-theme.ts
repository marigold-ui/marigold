import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

// Set once per `validate()`, mirroring setComponentResolutionRoot. Without it
// a globally-installed `marigold` resolves `@marigold/theme-rui` relative to
// itself rather than the target project.
let resolutionRoot: string | undefined;

// Not the public entry point: design-tokens.ts wraps this to also invalidate
// its own root-keyed caches, and callers should use its setThemeResolutionRoot
// (importing it here would be a cycle). Returns whether the root actually
// changed, so the wrapper only resets when it needs to.
export const setThemeResolutionRootRaw = (dir: string): boolean => {
  if (dir === resolutionRoot) return false;
  resolutionRoot = dir;
  return true;
};

const resolveThemeRuiEntry = (): string => {
  if (resolutionRoot) {
    try {
      return require.resolve('@marigold/theme-rui', {
        paths: [resolutionRoot],
      });
    } catch {
      // Fall through to the CLI-relative attempt below.
    }
  }
  return require.resolve('@marigold/theme-rui');
};

export const resolveThemeDir = (): string | null => {
  try {
    const entry = resolveThemeRuiEntry();
    let dir = path.dirname(entry);
    while (dir !== path.dirname(dir)) {
      const pkg = path.join(dir, 'package.json');
      if (fs.existsSync(pkg)) {
        // Without the name check, a nested package.json on the resolved path
        // would be mistaken for the package root and theme.css looked up under
        // dist/dist/. Mirrors the walk-ups in components.ts and renderer.ts.
        let name: string | undefined;
        try {
          name = (
            JSON.parse(fs.readFileSync(pkg, 'utf-8')) as { name?: string }
          ).name;
        } catch {
          // Unreadable/malformed package.json — keep walking up.
        }
        if (name === '@marigold/theme-rui') return dir;
      }
      dir = path.dirname(dir);
    }
  } catch {
    // @marigold/theme-rui not installed
  }
  return null;
};

export const resolveThemeCss = (): string | null => {
  const dir = resolveThemeDir();
  if (!dir) return null;
  const themeCss = path.join(dir, 'dist', 'theme.css');
  return fs.existsSync(themeCss) ? themeCss : null;
};
