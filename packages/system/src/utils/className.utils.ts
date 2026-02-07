import { type ClassValue, type VariantProps, defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

export type { ClassValue, VariantProps };
export type ConfigSchema = Record<string, Record<string, ClassValue>>;

const { cva: _cva, cx } = defineConfig({
  hooks: { onComplete: className => twMerge(className) },
});

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * Accepts strings, arrays, and conditional values (falsy values are filtered out).
 *
 * @example
 * cn('px-4', 'px-8') // => 'px-8'
 * cn('text-sm', isLarge && 'text-lg') // => 'text-lg' (when isLarge is true)
 */
export const cn = cx;

/**
 * Create a variant-driven class name function with Tailwind-aware merging.
 * Wraps cva to attach a `.variants` property used by `extendTheme`.
 *
 * @example
 * const button = cva({
 *   base: ['px-4 py-2'],
 *   variants: {
 *     variant: { primary: 'bg-blue-500', secondary: 'bg-gray-200' },
 *     size: { sm: 'text-sm', lg: 'text-lg' },
 *   },
 *   defaultVariants: { variant: 'primary' },
 * });
 *
 * button() // => 'px-4 py-2 bg-blue-500'
 * button({ variant: 'secondary', size: 'lg' }) // => 'px-4 py-2 bg-gray-200 text-lg'
 * button.variants // => { variant: { primary: '...', ... }, size: { ... } }
 */
export const cva = (config?: {
  base?: ClassValue;
  variants?: ConfigSchema;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Record<string, unknown>[];
}) => {
  const fn = config
    ? _cva(config as Parameters<typeof _cva>[0])
    : ((() => '') as (...args: unknown[]) => string);
  return Object.assign(fn, { variants: config?.variants });
};
