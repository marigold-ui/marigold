import * as CSS from 'csstype';
import { NestedScaleDict } from '@theme-ui/css';
import { CSSObject } from './system';

/**
 * Props that every component should accepts to change the styling
 */
export type ThemeComponentProps = {
  variant?: string;
  size?: string;
};

/**
 * Structure for component styles in a theme.
 */
export type ThemeExtension<ComponentName extends string> = {
  [P in ComponentName]?: {
    base?: CSSObject;
    variant?: {
      [key: string]: CSSObject;
    };
    size?: {
      [key: string]: CSSObject;
    };
  };
};

/**
 * Structure for component styles in a theme that consists of multiple parts.
 */
export type ThemeExtensionsWithParts<
  ComponentName extends string,
  Parts extends string[]
> = {
  [P in ComponentName]?: {
    base?: { [Part in Parts[number]]?: CSSObject };
    variant?: {
      [key: string]: { [Part in Parts[number]]?: CSSObject };
    };
    size?: {
      [key: string]: { [Part in Parts[number]]?: CSSObject };
    };
  };
};

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
 * to create consitency in sizing across visual elements. They give
 * plain values semantics meaning.
 *
 * Marigold uses a plain object to define scales, where the key should be a
 * descriptive name for the scale (e.g. `small`/`medium`/.. or `body`/`heading`/...),
 * and the value is the CSS value.
 */
export interface Scale<T> {
  [key: string]: ScaleValue<T>;
}

/**
 * A {@link Scale} that also includes a required `none` value, which is
 * usually used to define the blank value (e.g `0`).
 */
export interface ZeroScale<T> extends Scale<T> {
  none: ScaleValue<T>;
}

/**
 * Predefined {@link Scale} scale which uses size values.
 */
export interface SizeScale<T> {
  regular?: ScaleValue<T>;

  xxsmall?: ScaleValue<T>;
  xsmall?: ScaleValue<T>;
  small?: ScaleValue<T>;
  medium?: ScaleValue<T>;
  large?: ScaleValue<T>;
  xlarge?: ScaleValue<T>;
  xxlarge?: ScaleValue<T>;
  xxxlarge?: ScaleValue<T>;
  huge?: ScaleValue<T>;
  epic?: ScaleValue<T>;
}

/**
 * A {@link SizeScale} that also includes a required `none` value, which is
 * usually used to define the blank value (e.g `0`).
 */
export interface ZeroSizeScale<T> extends SizeScale<T> {
  none: ScaleValue<T>;
}

/**
 * Base theme with typings for available scales properties.
 */
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
   *     '40em', '50em', '64em',
   *   ],
   * }
   * ```
   */
  breakpoints?: Array<string>;

  colors?: Scale<CSS.Property.Color | NestedScaleDict<CSS.Property.Color>>;

  /**
   * Used to define a scale for whitspace values,
   * like `padding`, `margin`, `gap`, etc.
   */
  space?: ZeroSizeScale<CSS.Property.Margin<number | string>>;

  /**
   * Used to define a `font-size` scale.
   */
  fontSizes?: Scale<CSS.Property.FontSize<number>>;

  /**
   * Used to define a `font-family` scale.
   */
  fonts?: Scale<CSS.Property.FontFamily>;

  /**
   * Used to define a `font-weight` scale.
   */
  fontWeights?: Scale<CSS.Property.FontWeight>;

  /**
   * Used to define a `line-height` scale.
   */
  lineHeights?: Scale<CSS.Property.LineHeight<string | 0 | number>>;

  /**
   * Used to define a `letter-spacing` scale.
   */
  letterSpacings?: Scale<CSS.Property.LetterSpacing<string | 0 | number>>;

  /**
   * Used to define a scale for size values,
   * like `height`, `width`, `flexBasis`, etc.
   */
  sizes?: ZeroSizeScale<CSS.Property.Height<{}> | CSS.Property.Width<{}>>;

  /**
   * Used to define different `border` styles.
   */
  borders?: ZeroScale<CSS.Property.Border<{}>>;

  /**
   * Used to define `border-style` styles.
   */
  borderStyles?: Scale<CSS.Property.Border<{}>>;

  /**
   * Used to define `border-width` styles.
   */
  borderWidths?: ZeroScale<CSS.Property.BorderWidth<string | 0 | number>>;

  /**
   * Used to define `border-radius` styles.
   */
  radii?: ZeroScale<CSS.Property.BorderRadius<string | 0 | number>>;

  /**
   * Used to define `Shadow` styles.
   */
  shadows?: ZeroScale<CSS.Property.BoxShadow>;

  /**
   * Used to define a `z-index` scake.
   */
  zIndices?: Scale<CSS.Property.ZIndex>;

  /**
   * Used to define a `opacity` scale.
   */
  opacities?: Scale<CSS.Property.Opacity>;

  /**
   * Used to define a `transition` styles.
   */
  transitions?: Scale<CSS.Property.Transition>;
}
