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
