import type { CSSProperties } from 'react';

const isNumber = (value: string) => /^[0-9]+(\.[0-9]+)?$/.test(value);

/**
 * Generates a CSS custom property (`--{name}`) to use with a spacing class name (e.g. `p-(--{name})`).
 *
 * If `value` is a decimal, uses the `--spacing` scale from Tailwind.
 * Otherwise, references a specific spacing variable (e.g., `--spacing-group`).
 *
 * @param name - The custom property name for spacing.
 * @param value - Spacing value as a string (decimal or scale key).
 * @returns Object with the CSS custom property for spacing.
 */
export const spacing = (name: string, value: string) => {
  return {
    [`--${name}`]: isNumber(value)
      ? `calc(var(--spacing) * ${value})`
      : `var(--spacing-${value})`,
  } as CSSProperties;
};
