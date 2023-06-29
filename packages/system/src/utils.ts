import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export { cva } from 'class-variance-authority';

export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

export const cn = (...inputs: ClassValue[]) => twMerge(cx(inputs));

export const createVar = (o: { [key: string]: string | number | undefined }) =>
  Object.fromEntries(
    Object.entries(o).map(([name, val]) => [`--${name}`, val])
  ) as React.CSSProperties;

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
