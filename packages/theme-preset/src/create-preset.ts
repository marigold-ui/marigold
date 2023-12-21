import deepmerge from 'deepmerge';
import plugin from 'tailwindcss/plugin';
import type { Config, OptionalConfig } from 'tailwindcss/types/config';

import { defaultTheme } from '@marigold/system';

export const createPreset = (name: string, config: Partial<OptionalConfig>) =>
  deepmerge<Partial<OptionalConfig> & { content: string[] }>(
    {
      important: `[data-theme="${name}"]`,
      content: ['./node_modules/@marigold/components/dist/**/*.js'],
      theme: {
        extends: {
          defaultTheme,
        },
      },
      plugins: [
        require('tailwindcss-react-aria-components')({ prefix: 'rac' }),
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
                focus: 'focus',
                hover: 'hover',
                error: 'error',
                readonly: 'read-only',
                required: 'required',
                selected: 'selected',
                checked: 'checked',
                indeterminate: 'indeterminate',
                disabled: 'disabled',
                placementL: 'placement="left"',
                placementR: 'placement="right"',
                placementT: 'placement="top"',
                placementB: 'placement="bottom"',
              },
            }
          );
          matchVariant(
            'placement',
            value => {
              return `&[data-placement=${value}]`;
            },
            {
              values: {
                t: 'top',
                r: 'right',
                b: 'bottom',
                l: 'left',
              },
            }
          );
        }),
        // Aria Variants
        plugin(({ addVariant }) => {
          addVariant('aria-enabled', ['&:not([aria-disabled=true])']);
        }),
      ],
    },
    config
  ) satisfies Config;
