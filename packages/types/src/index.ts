/**
 * Make an object or array mutable.
 */
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * Get values of an `array` as literals.
 * *Note:* To make this work you should use `as const`.
 */
export type ValueOf<T extends any[] | Readonly<any[]>> = Mutable<T>[number];

/**
 * Flatten an `array`. This will land in TS soon.
 * See: https://github.com/microsoft/TypeScript/pull/32131
 */
export type Flat<A, D extends number> = {
  '1': A;
  // prettier-ignore
  '0': A extends ReadonlyArray<infer T>
      ? Flat<T, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][D]>
      : A
}[D extends -1 ? '1' : '0'];
