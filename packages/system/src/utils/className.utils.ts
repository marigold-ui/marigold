import type { ClassValue, VariantProps } from 'cva';
import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

export type { ClassValue, VariantProps };
export type ConfigSchema = Record<string, Record<string, ClassValue>>;

const { cva: _cva, cx } = defineConfig({
  hooks: { onComplete: className => twMerge(className) },
});

// Store variant config associated with each cva function without polluting the public API
type AnyFunction = (...args: never[]) => unknown;
const variantStore = new WeakMap<AnyFunction, ConfigSchema | undefined>();

/**
 * Retrieve the variant config for a cva function.
 */
export const getVariants = (fn: AnyFunction): ConfigSchema | undefined =>
  variantStore.get(fn);

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * Accepts strings, arrays, and conditional values (falsy values are filtered out).
 *
 * @example
 * cn('px-4', 'px-8') // => 'px-8'
 * cn('text-sm', isLarge && 'text-lg') // => 'text-lg' (when isLarge is true)
 */
export const cn = cx;

// Internal types for CVA variant inference
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;
type CVAVariantSchema<V extends ConfigSchema> = {
  [Variant in keyof V]?: StringToBoolean<keyof V[Variant]> | undefined;
};
type CVAClassProp =
  | { class?: ClassValue; className?: never }
  | { class?: never; className?: ClassValue };

/**
 * Create a variant-driven class name function with Tailwind-aware merging.
 * Variant config is stored internally and accessible via `getVariants()`.
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
 */
export function cva<V extends ConfigSchema>(config: {
  base?: ClassValue;
  variants: V;
  defaultVariants?: Partial<CVAVariantSchema<V>>;
  compoundVariants?: Array<Partial<CVAVariantSchema<V>> & CVAClassProp>;
}): (props?: CVAVariantSchema<V> & CVAClassProp) => string;
export function cva(config?: {
  base?: ClassValue;
}): (props?: CVAClassProp) => string;
export function cva(
  config?:
    | {
        base?: ClassValue;
        variants?: ConfigSchema;
        defaultVariants?: Record<string, string>;
        compoundVariants?: Record<string, unknown>[];
      }
    | { base?: ClassValue }
) {
  const fn = config
    ? _cva(config as Parameters<typeof _cva>[0])
    : ((() => '') as (...args: unknown[]) => string);
  variantStore.set(fn, (config as { variants?: ConfigSchema })?.variants);
  return fn;
}
