import type { Theme } from '../types/theme';
import { cn } from '../utils/className.utils';

export type StylesProps = {
  [K in keyof Theme['components']]: Partial<Theme['components'][K]>;
};

type StyleFn = (props?: Record<string, unknown>) => string;

/**
 * Compose two style functions into one. The new function's styles
 * are applied on top of the existing function's styles via `cn` (twMerge),
 * so Tailwind conflicts are resolved with "new wins".
 */
const composeStyleFns =
  (newFn: StyleFn, existingFn: StyleFn): StyleFn =>
  (props?) =>
    cn(existingFn(props), newFn(props));

export const extendTheme = (newStyles: StylesProps, theme: Theme) => {
  const mergedComponents = { ...theme.components };

  for (const key of Object.keys(newStyles)) {
    const component = key as keyof typeof mergedComponents;
    const existing = mergedComponents[component];
    if (!existing) continue;

    const incoming = newStyles[component] as StyleFn | Record<string, StyleFn>;

    if (typeof incoming === 'function') {
      // @ts-expect-error — dynamic component key loses type narrowing
      mergedComponents[component] = composeStyleFns(
        incoming,
        existing as StyleFn
      );
    } else {
      const existingSlots = existing as Record<string, StyleFn>;
      const merged = { ...existingSlots };

      for (const slot of Object.keys(incoming)) {
        merged[slot] = composeStyleFns(incoming[slot], existingSlots[slot]);
      }

      // @ts-expect-error — dynamic component key loses type narrowing
      mergedComponents[component] = merged;
    }
  }

  return { ...theme, components: { ...mergedComponents } };
};
