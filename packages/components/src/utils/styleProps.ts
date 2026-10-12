import type {
  AlignmentProp,
  AspectProp,
  CursorProp,
  FontSizeProp,
  FontStyleProp,
  FontWeightProp,
  LineHeightProp,
  PlaceItemsProp,
  TextAlignProp,
  TextWrapProp,
  VerticalAlignProp,
  WhiteSpaceProps,
} from '@marigold/system';

// Class maps live here, not in @marigold/system, so Tailwind finds them when scanning @marigold/components.

type ValueOf<T, K extends keyof T> = NonNullable<T[K]>;
type Orientation = ValueOf<AlignmentProp, 'orientation'>;
type Vertical = ValueOf<Orientation, 'vertical'>;
type Horizontal = ValueOf<Orientation, 'horizontal'>;

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
} as const satisfies Record<ValueOf<FontWeightProp, 'weight'>, string>;

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
} as const satisfies Record<ValueOf<FontSizeProp, 'fontSize'>, string>;

export const textStyle = {
  italic: 'italic',
  normal: 'not-italic',
} as const satisfies Record<ValueOf<FontStyleProp, 'fontStyle'>, string>;

export const textWrap = {
  wrap: 'text-wrap',
  noWrap: 'text-nowrap',
  balance: 'text-balance',
  pretty: 'text-pretty',
} as const satisfies Record<ValueOf<TextWrapProp, 'wrap'>, string>;

export const whiteSpace = {
  normal: 'whitespace-normal',
  nowrap: 'whitespace-nowrap',
  pre: 'whitespace-pre',
  preLine: 'whitespace-pre-line',
  preWrap: 'whitespace-pre-wrap',
  breakSpaces: 'whitespace-break-spaces',
} as const satisfies Record<ValueOf<WhiteSpaceProps, 'whiteSpace'>, string>;

export const lineHeight = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
} as const satisfies Record<ValueOf<LineHeightProp, 'lineHeight'>, string>;

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
} as const satisfies {
  vertical: {
    alignmentX: Record<ValueOf<Vertical, 'alignX'>, string>;
    alignmentY: Record<ValueOf<Vertical, 'alignY'>, string>;
  };
  horizontal: {
    alignmentX: Record<ValueOf<Horizontal, 'alignX'>, string>;
    alignmentY: Record<ValueOf<Horizontal, 'alignY'>, string>;
  };
};

export const placeItems = {
  none: undefined,
  left: 'place-items-start',
  center: 'place-items-center',
  right: 'place-items-end',
} as const satisfies Record<
  ValueOf<PlaceItemsProp, 'align'>,
  string | undefined
>;

export const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const satisfies Record<ValueOf<TextAlignProp, 'align'>, string>;

export const verticalAlign = {
  top: 'align-top',
  middle: 'align-middle',
  bottom: 'align-bottom',
  baseline: 'align-baseline',
} as const satisfies Record<
  ValueOf<VerticalAlignProp, 'verticalAlign'>,
  string
>;

export const aspect = {
  square: 'aspect-[1]',
  landscape: 'aspect-4/3',
  portrait: 'aspect-3/4',
  widescreen: 'aspect-16/9',
  ultrawide: 'aspect-18/5',
  golden: 'aspect-[1.6180/1]',
} as const satisfies Record<ValueOf<AspectProp, 'ratio'>, string>;

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
  grab: 'cursor-grab',
  grabbing: 'cursor-grabbing',
  // Deprecated misspellings, remove in the next major.
  grap: 'cursor-grab',
  grapping: 'cursor-grabbing',
  scroll: 'cursor-all-scroll',
  colResize: 'cursor-col-resize',
  rowResize: 'cursor-row-resize',
  ewResize: 'cursor-ew-resize',
  nsResize: 'cursor-ns-resize',
  zoomIn: 'cursor-zoom-in',
  zoomOut: 'cursor-zoom-out',
} as const satisfies Record<ValueOf<CursorProp, 'cursor'>, string>;
