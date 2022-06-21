export * from 'type-fest';
export * from './react';
export declare type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export declare type ZeroToNine = 0 | OneToNine;
/**
 * Percentage value.
 */
export declare type Percentage =
  | `${ZeroToNine}%`
  | `${OneToNine}${ZeroToNine}%`;
export declare type NonZeroPercentage =
  | `${OneToNine}%`
  | `${OneToNine}${ZeroToNine}%`;
//# sourceMappingURL=index.d.ts.map
