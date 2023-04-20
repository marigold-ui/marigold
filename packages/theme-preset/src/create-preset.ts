import path from 'node:path';
import deepmerge from 'deepmerge';
import { sync as findUpSync } from 'find-up';
import type { Config, OptionalConfig } from 'tailwindcss/types/config';

import { defaultTheme } from '@marigold/system';

export const createPreset = (name: string, config: Partial<OptionalConfig>) => {
  const parent = path.resolve(__dirname, '..');

  const packageDir = findUpSync('package.json', { cwd: parent });
  if (!packageDir) {
    throw new Error('Package not found.');
  }
  const root = path.dirname(packageDir);

  return deepmerge<Partial<OptionalConfig> & { content: string[] }>(
    {
      important: `[data-theme="${name}"]`,
      content: [
        path.resolve(root, 'node_modules/@marigold/components/**/**/*.tsx'),
      ],
      theme: {
        extends: {
          defaultTheme,
        },
      },
    },
    config
  ) satisfies Config;
};
