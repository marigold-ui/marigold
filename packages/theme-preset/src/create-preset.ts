import path from 'node:path';
import deepmerge from 'deepmerge';
import { sync as findUpSync } from 'find-up';
import type { Config, OptionalConfig } from 'tailwindcss/types/config';
import plugin from 'tailwindcss/plugin';

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
      plugins: [
        // Grouping
        plugin(({ matchVariant, e }) => {
          matchVariant(
            'group',
            (value, { modifier }) =>
              modifier
                ? `:merge(.group\\/${e(modifier)})[data-${value}] &`
                : `:merge(.group)[data-${value}] &`,
            {
              values: {
                disabled: 'disabled',
                hover: 'hover',
                error: 'error',
                selected: 'selected',
              },
            }
          );
        }),

        // TODO: deprecate
        plugin(({ addVariant }) => {
          addVariant('mg-disabled', [
            '&[disabled]',
            '&[aria-disabled=true]',
            '&[data-disabled]',
          ]);
          addVariant('mg-selected', [
            '&[aria-selected=true]',
            '&[data-selected]',
          ]);
          addVariant('mg-error', [
            '&:invalid',
            '&[aria-invalid=true]',
            '&[data-error]',
          ]);
          addVariant('mg-focus', ['&:focus', '&[data-focus]']);
          addVariant('mg-hover', [
            '&:hover:not([disabled])',
            '&[data-hover]',
            '&:hover',
          ]);
        }),
      ],
    },
    config
  ) satisfies Config;
};
