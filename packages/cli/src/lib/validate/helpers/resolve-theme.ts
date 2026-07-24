import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

export const resolveThemeDir = (): string | null => {
  try {
    const entry = require.resolve('@marigold/theme-rui');
    let dir = path.dirname(entry);
    while (dir !== path.dirname(dir)) {
      const pkg = path.join(dir, 'package.json');
      if (fs.existsSync(pkg)) {
        // Only accept the package.json that actually belongs to
        // @marigold/theme-rui — otherwise a nested package.json on the
        // resolved path (e.g. a bundled sub-package shipping its own
        // dist/package.json) would be mistaken for the package root and
        // theme.css would be looked up under dist/dist/. Mirrors the
        // name-verified walk-up in helpers/components.ts::findMarigoldComponentsDts
        // and spatial/renderer.ts::findPackageDir.
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
