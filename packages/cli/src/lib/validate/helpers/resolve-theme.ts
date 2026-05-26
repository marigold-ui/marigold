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
      if (fs.existsSync(pkg)) return dir;
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
