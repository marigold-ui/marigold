import { cx } from 'class-variance-authority';
import { cva as _cva } from 'class-variance-authority';
import {
  ClassProp,
  ClassValue,
  StringToBoolean,
} from 'class-variance-authority/dist/types';
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
  ) as React.CSSProperties;

export const isObject = (val: any): val is { [key: string]: any } =>
  val && val.constructor === Object;

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
 * Safely get a color value from a Tailwind theme object. This also supports
 * Tailwind's "DEFAULT" fallback.
 *
 * Note: Use the CSS "var name" (e.g. primary-500) not the dot notation.
 */
export const getColor = (
  theme: { colors?: object },
  path: string,
  fallback?: any
): any => {
  const result = get(theme.colors || {}, path.replace(/-/g, '.'), fallback);
  return isObject(result) ? result['DEFAULT'] : result;
};
