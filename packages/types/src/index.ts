export * from 'type-fest';
export * from './react';

export type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type ZeroToNine = 0 | OneToNine;

/**
 * Percentage value.
 */
export type Percentage = `${ZeroToNine}%` | `${OneToNine}${ZeroToNine}%`;
export type NonZeroPercentage = `${OneToNine}%` | `${OneToNine}${ZeroToNine}%`;
