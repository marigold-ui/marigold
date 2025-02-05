import { cx } from 'class-variance-authority';
import { cva as _cva } from 'class-variance-authority';
import {
  ClassProp,
  ClassValue,
  StringToBoolean,
} from 'class-variance-authority/dist/types';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTheme } from './hooks';

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
 * Get a color from the theme based on computed styles
 */
export const getColor = (token: string): any => {
  const { name } = useTheme();
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const themeElement = document.querySelector(`[data-theme="${name}"]`);
      if (themeElement) {
        const styles = getComputedStyle(themeElement);
        const result = styles.getPropertyValue(`--color-${token}`).trim();
        setTheme(result || null);
      }
    }
  }, [name, token]);

  return theme;
};
