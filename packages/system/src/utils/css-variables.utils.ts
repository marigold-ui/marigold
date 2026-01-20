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
 * Checks if a value represents a fraction (e.g., "1/2", "2/3").
 *
 * @param value - The string to test for fraction format.
 * @returns `true` if the string is a valid fraction, otherwise `false`.
 */
export const isFraction = (value: string) => /^[0-9]+\/[0-9]+$/.test(value);

/**
 * Represents the numeric values found in the default Tailwind CSS spacing scale.
 *
 * Includes:
 * - Fractional steps: 0.5, 1.5, 2.5, 3.5
 * - Integer steps: 0–12
 * - Extended spacing steps: 14, 16, 20... up to 96
 */
// prettier-ignore
export type ScaleValue = 
  | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4
  | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40
  | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;

/**
 * A strictly typed union of valid Tailwind CSS spacing keys.
 * Accepts both the raw numbers (e.g., `4`, `2.5`) and their string equivalents (e.g., `"4"`, `"2.5"`).
 *
 * @example
 * const spacing: Scale = 4;      // Valid (matches w-4)
 * const padding: Scale = "2.5";  // Valid (matches p-2.5)
 */
export type Scale = ScaleValue | `${ScaleValue}`;

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

/**
 * Generates a CSS custom property for width that uses either a calc expression or a
 * fraction percentage.
 *
 * Supports:
 * - Numeric scale (e.g., "4", "2.5"): Uses `--spacing` scale with calc() → `w-4`, `w-2.5`
 * - Fractions (e.g., "1/2", "2/3"): Converts to percentage → `w-1/2`, `w-2/3`
 * - CSS keywords (e.g., "fit", "min", "max"): Uses corresponding CSS values → `w-fit`, `w-min`, `w-max`
 *
 * @param name - The custom property name for width.
 * @param value - Width value as a string (number, fraction, or keyword).
 * @returns Object with the CSS custom property for width.
 *
 */
export const createWidthVar = (name: string, value: string) => {
  const widthKeywords: Record<string, string> = {
    fit: 'fit-content',
    min: 'min-content',
    max: 'max-content',
    full: '100%',
    screen: '100vw',
    auto: 'auto',
  };

  return {
    [`--${name}`]:
      widthKeywords[value] ||
      (isScale(value) && `calc(var(--spacing) * ${value})`) ||
      (isFraction(value) && `calc(${value.split('/').join(' / ')} * 100%)`),
  } as CSSProperties;
};
