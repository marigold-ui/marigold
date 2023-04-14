import path from 'node:path';
import deepmerge from 'deepmerge';
import { sync as findUpSync } from 'find-up';
import type { Config, OptionalConfig } from 'tailwindcss/types/config';

import { defaultTheme } from '@marigold/system';

export const createPreset = (name: string, config: Partial<OptionalConfig>) => {
  const parent = path.resolve(__dirname, '..');
  const root = path.dirname(findUpSync('package.json', { cwd: parent }) || '.');

  console.log(__dirname, root);
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
