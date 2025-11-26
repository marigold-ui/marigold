import { cva as _cva, cx } from 'class-variance-authority';
import {
  ClassProp,
  ClassValue,
  StringToBoolean,
} from 'class-variance-authority/dist/types';
import type { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

export type { ClassValue };
export type { VariantProps } from 'class-variance-authority';

export type ConfigSchema = Record<string, Record<string, ClassValue>>;
export type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
export type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};
export type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
        : ClassProp)[];
    }
  : never;

export type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp
  : ClassProp;

export const cva = <T>(base?: ClassValue, config?: Config<T>) => {
  function styles(props?: Props<T>) {
    return twMerge(_cva(base, config)(props));
  }
  styles.variants = config?.variants;

  return styles;
};

export const cn = (...inputs: ClassValue[]) => twMerge(cx(inputs));

export const createVar = (o: { [key: string]: string | number | undefined }) =>
  Object.fromEntries(
    Object.entries(o).map(([name, val]) => [`--${name}`, val])
  ) as CSSProperties;

/**
 * Safely get a dot-notated path within a nested object, with ability
 * to return a default if the full key path does not exist or
 * the value is undefined
 *
 * Based on: https://github.com/developit/dlv
 */
export const get = (obj: object, path: string, fallback?: any): any => {
  const key = path.split('.');

  let result = obj;
  for (let i = 0, length = key.length; i < length; i++) {
    if (!result) break;
    result = (result as any)[key[i]];
  }

  return result === undefined ? fallback : result;
};

/**
 * Checks if a given string is a valid CSS custom property name (without the leading `--`).
 *
 * This simplified check ensures:
 * - The name does not start with a digit.
 * - It contains only word characters (letters, digits, underscore) or hyphens.
 * - It must include at least one hyphen to be considered a custom property name.
 */
export const isValidCssCustomPropertyName = (val: string) =>
  /^[A-Za-z0-9_-]+$/.test(val);

/**
 * Ensures that the given value is formatted as a CSS variable reference.
 *
 * If the provided value (`val`) is a valid CSS custom property name (without the leading `--`),
 * the function returns a string in the form of `var(--<prefix-if-provided><val>, <val>)`. When a
 * `prefix` is provided, it is prepended to the custom property name with a hyphen.
 *
 * If the value is not a valid custom property name, the function returns the original value.
 */
export const ensureCssVar = (val: string, prefix?: string) =>
  isValidCssCustomPropertyName(val)
    ? `var(--${prefix ? `${prefix}-` : ''}${val}, ${val})`
    : val;
