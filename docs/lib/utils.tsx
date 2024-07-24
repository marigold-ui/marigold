import type { ConfigSchema, Theme } from '@marigold/system';

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

const getKeys = (schema: ConfigSchema) => {
  return {
    variant: schema?.variant && Object.keys(schema?.variant),
    size: schema?.size && Object.keys(schema?.size),
  };
};

const getKeysFromSlots = (o: {
  [slot: string]: { variants: ConfigSchema };
}) => {
  let v = new Set<string>();
  let s = new Set<string>();

  Object.values(o).forEach(value => {
    v = new Set([...v, ...Object.keys(value.variants?.variant ?? {})]);
    s = new Set([...s, ...Object.keys(value.variants?.size ?? {})]);
  });

  return { variant: [...v], size: [...s] };
};

/**
 * Get variants and sizes (= apperances) from a component
 */
export const getAppearance = (
  name: keyof Theme['components'],
  theme: Theme
) => {
  const styles = theme.components[name] || {};
  const appearances =
    'variants' in styles
      ? getKeys(styles.variants as ConfigSchema)
      : getKeysFromSlots(styles);

  return appearances;
};
