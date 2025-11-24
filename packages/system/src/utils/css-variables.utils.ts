import type { CSSProperties } from 'react';

/**
 * Checks if the provided string represents a numeric scale value.
 *
 * A scale value is defined as a string containing only digits,
 * optionally followed by a decimal point and more digits (e.g., "1", "2.5").
 *
 * @param value - The string to test for scale format.
 * @returns `true` if the string is a valid scale value, otherwise `false`.
 */
export const isScale = (value: string) => /^[0-9]+(\.[0-9]+)?$/.test(value);

/**
 * Checks if a given string is a valid CSS custom property name (without the leading `--`).
 *
 * This simplified check ensures:
 * - The name does not start with a digit.
 * - It contains only word characters (letters, digits, underscore) or hyphens.
 * - It must include at least one hyphen to be considered a custom property name.
 */
export const isValidCssCustomPropertyName = (val: string) =>
  /^[A-Za-z0-9_-]+$/.test(val);

/**
 * Ensures that the given value is formatted as a CSS variable reference.
 *
 * If the provided value (`val`) is a valid CSS custom property name (without the leading `--`),
 * the function returns a string in the form of `var(--<prefix-if-provided><val>, <val>)`. When a
 * `prefix` is provided, it is prepended to the custom property name with a hyphen.
 *
 * If the value is not a valid custom property name, the function returns the original value.
 */
export const ensureCssVar = (val: string, prefix?: string) =>
  isValidCssCustomPropertyName(val)
    ? `var(--${prefix ? `${prefix}-` : ''}${val}, ${val})`
    : val;

/**
 * Creates a CSS custom properties object from the given key-value pairs.
 *
 * @param o - An object with string keys and string/number/undefined values
 * @returns A CSSProperties object with `--` prefixed keys
 */
export const createVar = (o: { [key: string]: string | number | undefined }) =>
  Object.fromEntries(
    Object.entries(o).map(([name, val]) => [`--${name}`, val])
  ) as CSSProperties;

/**
 * Generates a CSS custom property for spacing that uses either a calc expression or a
 * spacing variable reference.
 *
 * If `value` is a number (integer or decimal), uses the `--spacing` scale from Tailwind with calc().
 * Otherwise, references a specific spacing variable (e.g., `--spacing-group`).
 *
 * @param name - The custom property name for spacing.
 * @param value - Spacing value as a string (number or scale key).
 * @returns Object with the CSS custom property for spacing.
 */
export const createSpacingVar = (name: string, value: string) => {
  return {
    [`--${name}`]: isScale(value)
      ? `calc(var(--spacing) * ${value})`
      : `var(--spacing-${value})`,
  } as CSSProperties;
};
