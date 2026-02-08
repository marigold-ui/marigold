import type { Theme } from '../types/theme';
import { type ConfigSchema, cva, getVariants } from '../utils/className.utils';

export type StylesProps = {
  [K in keyof Theme['components']]: Partial<Theme['components'][K]>;
};

type StyleFn = (props?: Record<string, unknown>) => string;

const VARIANT_KEYS = ['size', 'variant'] as const;

/**
 * Merge variant configs from two style functions.
 * Throws on duplicate variant values when `checkDuplicates` is true.
 */
const mergeVariants = (
  newFn: StyleFn,
  existingFn: StyleFn,
  checkDuplicates: boolean
): ConfigSchema => {
  const newVariants = getVariants(newFn);
  const existingVariants = getVariants(existingFn);
  const merged: ConfigSchema = {};

  for (const key of VARIANT_KEYS) {
    const newValues = newVariants?.[key];
    const existingValues = existingVariants?.[key];

    if (checkDuplicates && newValues && existingValues) {
      const duplicates = Object.keys(newValues).filter(
        v => v in existingValues
      );
      if (duplicates.length) {
        throw new Error(duplicates.join() + ' already exists!');
      }
    }

    merged[key] = { ...newValues, ...existingValues };
  }

  return merged;
};

/**
 * Combine two style functions into one, merging their base classes and variants.
 */
const mergeStyleFns = (
  newFn: StyleFn,
  existingFn: StyleFn,
  checkDuplicates: boolean
): StyleFn =>
  cva({
    base: [existingFn(), newFn()],
    variants: mergeVariants(newFn, existingFn, checkDuplicates),
  }) as StyleFn;

export const extendTheme = (newStyles: StylesProps, theme: Theme) => {
  const mergedComponents = { ...theme.components };

  for (const key of Object.keys(newStyles)) {
    const component = key as keyof typeof mergedComponents;
    const existing = mergedComponents[component];
    if (!existing) continue;

    const incoming = newStyles[component] as StyleFn | Record<string, StyleFn>;

    if (typeof incoming === 'function') {
      // @ts-expect-error — dynamic component key loses type narrowing
      mergedComponents[component] = mergeStyleFns(
        incoming,
        existing as StyleFn,
        true
      );
    } else {
      const existingSlots = existing as Record<string, StyleFn>;
      const merged = { ...existingSlots };

      for (const slot of Object.keys(incoming)) {
        merged[slot] = mergeStyleFns(
          incoming[slot],
          existingSlots[slot],
          false
        );
      }

      // @ts-expect-error — dynamic component key loses type narrowing
      mergedComponents[component] = merged;
    }
  }

  return { ...theme, components: { ...mergedComponents } };
};
