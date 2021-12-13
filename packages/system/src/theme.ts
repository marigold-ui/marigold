import * as CSS from 'csstype';
import { NestedScaleDict } from '@theme-ui/css';

/**
 * Value used to define a scale.
 *
 * Can be nested to support a default value.
 *
 * @example
 * Given a theme
 * ```
 * {
 *   colors: {
 *     primary: { __default: '#00f', light: '#33f' }
 *   }
 * }
 * ```
 * `css{{ color: 'primary' }}` resolves to `color: #00f`.
 */
export type ScaleValue<T> = T | T[] | NestedScaleDict<T> | undefined;

/**
 * Scales are a set of named, pre-defined CSS values which are used
 * to create consitency in sizing across visual elements.
 *
 * Marigold uses a plain object to define scales, where the key is a
 * descriptive name for the scale (e.g. `small` or `medium`), and the value
 * is the CSS value.
 */
export type Scale<T> = {
  xxsmall?: ScaleValue<T>;
  xsmall?: ScaleValue<T>;
  small?: ScaleValue<T>;
  medium?: ScaleValue<T>;
  large?: ScaleValue<T>;
  xlarge?: ScaleValue<T>;
  xxlarge?: ScaleValue<T>;
};

/**
 * A {@link Scale} that also includes a required `none` value, which is
 * usually used to define the blank value (e.g `0`).
 */
export type ZeroScale<T> = {
  none: ScaleValue<T>;
} & Scale<T>;

export interface Theme {
  /**
   * To configure the default breakpoints used in responsive array values,
   * add a breakpoints array to your theme.
   *
   * Each breakpoint should be a string  with a CSS length unit included or a
   * string including a CSS media query. String values with a CSS length unit
   * will be used to generate a mobile-first (i.e. min-width) media query.
   *
   * @example
   * ```ts
   * {
   *   breakpoints: [
   *     '40em', '@media (min-width: 56em) and (orientation: landscape)', '64em',
   *   ],
   * }
   * ```
   */
  breakpoints?: Array<string>;

  /**
   * Used for whitespace properties like `padding`, `margin`, `gap`, etc.
   */
  space?: ZeroScale<CSS.Property.Margin<number | string>>;
}
