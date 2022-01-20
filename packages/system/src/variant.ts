const isNil = (value: any): value is null | undefined =>
  value === null || value === undefined;

/**
 * Ensures that the `val` is an array. Will return an empty array if `val` is falsy.
 */
export const ensureArray = <T>(val?: T | T[]) =>
  isNil(val) ? [] : Array.isArray(val) ? val : [val];

/**
 * Removes trailing dot from variant, if necessary. This is necessary to support
 * `__default` styles. See https://github.com/system-ui/theme-ui/pull/951
 */
export const ensureVariantDefault = (val: string) => val.replace(/\.$/, '');

/**
 * Ensures that the `variant` is an array and supports the `__default` key.
 */
export const ensureArrayVariant = <T extends string>(variant?: T | T[]) =>
  ensureArray(variant).map(ensureVariantDefault);

export type State = {
  checked?: boolean;
  focus?: boolean;
  hover?: boolean;
  disabled?: boolean;
  error?: boolean;
};

/**
 * Appends given `state` to a `variant`.
 */
export const appendVariantState = (variant: string, state: keyof State) => {
  return `${ensureVariantDefault(variant)}.:${state}`;
};

/**
 * Create a variant array from a `variant` and `state` containing
 * passed states, if they are truthy.
 */
export const conditional = (
  variant: string,
  { disabled = false, ...states }: State
) => {
  const entries = [...Object.entries(states), ['disabled', disabled]] as [
    keyof State,
    boolean
  ][];
  const stateVariants = entries
    .filter(([, val]) => Boolean(val))
    .map(([key]) => appendVariantState(variant, key));

  return [variant, ...stateVariants];
};
