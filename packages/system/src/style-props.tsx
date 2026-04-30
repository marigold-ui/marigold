import type { Scale } from './utils/css-variables.utils';

type Fraction =
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '1/6'
  | '2/6'
  | '3/6'
  | '4/6'
  | '5/6'
  | '1/12'
  | '2/12'
  | '3/12'
  | '4/12'
  | '5/12'
  | '6/12'
  | '7/12'
  | '8/12'
  | '9/12'
  | '10/12'
  | '11/12';

type DimensionKeyword =
  | 'auto'
  | 'full'
  | 'fit'
  | 'min'
  | 'max'
  | 'screen'
  | 'svh'
  | 'lvh'
  | 'dvh'
  | 'px';

type WidthKeyword = DimensionKeyword | 'container';

/**
 * Allowed values for the `width` style prop. Accepts the spacing scale (as
 * either `4` or `"4"`), fractions (`"1/2"`), and keywords (`"full"`, `"fit"`,
 * ...).
 */
export type WidthValue = Scale | Fraction | WidthKeyword;

/** Allowed values for the `maxWidth` style prop. See {@link WidthValue}. */
export type MaxWidthValue = Scale | Fraction | WidthKeyword;

/**
 * Allowed values for the `height` style prop. Like {@link WidthValue} but
 * without the `"container"` keyword.
 */
export type HeightValue = Scale | Fraction | DimensionKeyword;

export const fontWeight = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
} as const;

export const textSize = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
} as const;

export const textStyle = {
  italic: 'italic',
  normal: 'not-italic',
} as const;

export const textWrap = {
  wrap: 'text-wrap',
  noWrap: 'text-nowrap',
  balance: 'text-balance',
  pretty: 'text-pretty',
} as const;

export const whiteSpace = {
  normal: 'whitespace-normal',
  nowrap: 'whitespace-nowrap',
  pre: 'whitespace-pre',
  preLine: 'whitespace-pre-line',
  preWrap: 'whitespace-pre-wrap',
  breakSpaces: 'whitespace-break-spaces',
};

export const lineHeight = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
} as const;

export const alignment = {
  vertical: {
    alignmentX: {
      left: 'items-start',
      center: 'items-center',
      right: 'items-end',
      stretch: 'items-stretch',
    },
    alignmentY: {
      top: 'justify-start',
      center: 'justify-center',
      bottom: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
  horizontal: {
    alignmentY: {
      top: 'items-start',
      center: 'items-center',
      bottom: 'items-end',
    },
    alignmentX: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
} as const;

export const placeItems = {
  none: undefined,
  left: 'place-items-start',
  center: 'place-items-center',
  right: 'place-items-end',
} as const;

export const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const verticalAlign = {
  top: 'align-top',
  middle: 'align-middle',
  bottom: 'align-bottom',
  baseline: 'align-baseline',
} as const;

export const aspect = {
  square: 'aspect-[1]',
  landscape: 'aspect-4/3',
  portrait: 'aspect-3/4',
  widescreen: 'aspect-16/9',
  ultrawide: 'aspect-18/5',
  golden: 'aspect-[1.6180/1]',
} as const;

export const cursorStyle = {
  auto: 'cursor-auto',
  default: 'cursor-default',
  pointer: 'cursor-pointer',
  wait: 'cursor-wait',
  text: 'cursor-text',
  move: 'cursor-move',
  help: 'cursor-help',
  notAllowed: 'cursor-not-allowed',
  none: 'cursor-none',
  progress: 'cursor-progress',
  cell: 'cursor-cell',
  crosshair: 'cursor-crosshair',
  vertical: 'cursor-vertical-text',
  alias: 'cursor-alias',
  copy: 'cursor-copy',
  noDrop: 'cursor-no-drop',
  grap: 'cursor-grab',
  grapping: 'cursor-grapping',
  scroll: 'cursor-all-scroll',
  colResize: 'cursor-col-resize',
  rowResize: 'cursor-row-resize',
  ewResize: 'cursor-ew-resize',
  nsResize: 'cursor-ns-resize',
  zoomIn: 'cursor-zoom-in',
  zoomOut: 'cursor-zoom-out',
} as const;

export type AspectProp = { ratio?: keyof typeof aspect };
export type AlignmentProp = {
  orientation?: {
    vertical?: {
      alignY?: keyof typeof alignment.vertical.alignmentY;
      alignX?: keyof typeof alignment.vertical.alignmentX;
    };
    horizontal?: {
      alignX?: keyof typeof alignment.horizontal.alignmentX;
      alignY?: keyof typeof alignment.horizontal.alignmentY;
    };
  };
};
export type CursorProp = {
  /**
   * Set the cursor for the element. You can see allowed tokens [here](https://tailwindcss.com/docs/cursor).
   */
  cursor?: keyof typeof cursorStyle;
};

export type FontStyleProp = {
  /**
   * Set the font style for the text element.
   */
  fontStyle?: keyof typeof textStyle;
};

export type TextWrapProp = {
  /**
   * Set text wrapping behavior.
   */
  wrap?: keyof typeof textWrap;
};

export type WhiteSpaceProps = {
  /**
   * Set how white space inside the element is handled.
   */
  whiteSpace?: keyof typeof whiteSpace;
};

export type LineHeightProp = {
  /**
   * Set the line height for the text element.
   */
  lineHeight?: keyof typeof lineHeight;
};

export type FontWeightProp = {
  /**
   * Set the font weight for the text element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#typography).
   */
  weight?: keyof typeof fontWeight;
};

export type FontSizeProp = {
  /**
   * Set the font size for the text element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#typography).
   */
  fontSize?: keyof typeof textSize;
};

export type GapSpaceProp = {
  /**
   * The space between the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  space?: Scale;
};

export type PaddingSpaceProp = {
  /**
   * Set the padding space for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  space?: Scale;
};

export type PaddingSpacePropX = {
  /**
   * Set the horizontal padding space for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  spaceX?: Scale;
};

export type PaddingSpacePropY = {
  /**
   * Set the vertical padding space for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  spaceY?: Scale;
};

export type PaddingRightProp = {
  /**
   * Set the right padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  pr?: Scale;
};

export type PaddingLeftProp = {
  /**
   * Set the left padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  pl?: Scale;
};

export type PaddingTopProp = {
  /**
   * Set the top padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  pt?: Scale;
};

export type PaddingBottomProp = {
  /**
   * Set the bottom padding for the element. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
   *
   * Accepts a value from the spacing scale either as a number (`4`) or as its
   * string equivalent (`"4"`).
   */
  pb?: Scale;
};

export type PlaceItemsProp = {
  /**
   * Set the alignment of place-items property for the element.
   */
  align?: keyof typeof placeItems;
};

export type TextAlignProp = {
  /**
   * Set the text alignment for the element.
   */
  align?: keyof typeof textAlign;
};

export type VerticalAlignProp = {
  /**
   * Set the vertical alignment for the element.
   */
  verticalAlign?: keyof typeof verticalAlign;
};

export type WidthProp = {
  /**
   * Sets the width of the element. You can see allowed tokens [here](https://tailwindcss.com/docs/width).
   *
   * Accepts spacing-scale values as either numbers (`4`) or their string
   * equivalents (`"4"`), fractions (`"1/2"`), and keywords (`"full"`, `"fit"`, ...).
   */
  width?: WidthValue;
};

export type MaxWidthProp = {
  /**
   * Sets the max-width of the element. You can see allowed tokens [here](https://tailwindcss.com/docs/max-width).
   *
   * Accepts spacing-scale values as either numbers (`4`) or their string
   * equivalents (`"4"`), fractions (`"1/2"`), and keywords (`"full"`, `"fit"`, ...).
   */
  maxWidth?: MaxWidthValue;
};

export type HeightProp = {
  /**
   * Set the height of the element. You can see allowed tokens [here](https://tailwindcss.com/docs/height).
   *
   * Accepts spacing-scale values as either numbers (`4`) or their string
   * equivalents (`"4"`), fractions (`"1/2"`), and keywords (`"full"`, `"fit"`, ...).
   */
  height?: HeightValue;
};

/**
 * Defines spacing properties for managing space between child elements.
 * @template T - A string type parameter that allows extending the base spacing
 *               scale with custom values. Defaults to an empty string.
 */
export type SpaceProp<T extends string = ''> = {
  /**
   * Set the spacing between child elements.
   */
  space?: Scale | T;
};
