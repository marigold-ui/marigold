/**
 * Make an object or array mutable.
 */
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
