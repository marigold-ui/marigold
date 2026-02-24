import type { Theme } from '@marigold/system';
import { appearances } from '@marigold/theme-rui/appearances';

interface NestedStringObject {
  [key: string]: NestedStringObject | string;
}

// used to iterate through the colors and combine it in the right way e.g. 'bg-surface-sunken'
export const iterateTokens = (colors: NestedStringObject, prefix = '') => {
  let list: [token: string, color: string][] = [];

  for (const key in colors) {
    let value = colors[key];
    if (typeof value === 'object') {
      list.push(...iterateTokens(value, `${prefix}${key}-`));
    } else {
      list.push([`${prefix}${key}`, value]);
    }
  }
  return list;
};

/**
 * Get variants and sizes (= appearances) from a component.
 * Reads from build-time generated appearances.json.
 */
export const getAppearance = (
  name: keyof Theme['components'] | (string & {})
) => {
  const entry = (
    appearances as Record<
      string,
      { variant: readonly string[]; size: readonly string[] }
    >
  )[name];
  return entry ?? { variant: [], size: [] };
};

export const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
