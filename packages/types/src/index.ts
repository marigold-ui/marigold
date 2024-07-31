export * from 'type-fest';
export * from './react';

/**
 * Makes types more readable.
 * Stolen from: https://twitter.com/mattpocockuk/status/1622730173446557697
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type ZeroToNine = 0 | OneToNine;

/**
 * Percentage value.
 */
export type Percentage = `${ZeroToNine}%` | `${OneToNine}${ZeroToNine}%`;
export type NonZeroPercentage = `${OneToNine}%` | `${OneToNine}${ZeroToNine}%`;

/**
 * To use for color tokens.
 * https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
 */
export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[],
];

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : '';

export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
    : '';
