export const fontWeight = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

export const textSize = {
  xs: 'text-[13px]',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

export const textStyle = {
  italic: 'italic',
  normal: 'not-italic',
};

export const gapSpace = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
  11: 'gap-11',
  12: 'gap-12',
};

export const paddingSpace = {
  0: 'p-0',
  1: 'p-1',
  2: 'p-2',
  3: 'p-3',
  4: 'p-4',
  5: 'p-5',
  6: 'p-6',
  7: 'p-7',
  8: 'p-8',
  9: 'p-9',
  10: 'p-10',
  11: 'p-11',
  12: 'p-12',
};
export const paddingSpaceX = {
  0: 'px-0',
  1: 'px-1',
  2: 'px-2',
  3: 'px-3',
  4: 'px-4',
  5: 'px-5',
  6: 'px-6',
  7: 'px-7',
  8: 'px-8',
  9: 'px-9',
  10: 'px-10',
  11: 'px-11',
  12: 'px-12',
};
export const paddingSpaceY = {
  0: 'py-0',
  1: 'py-1',
  2: 'py-2',
  3: 'py-3',
  4: 'py-4',
  5: 'py-5',
  6: 'py-6',
  7: 'py-7',
  8: 'py-8',
  9: 'py-9',
  10: 'py-10',
  11: 'py-11',
  12: 'py-12',
};

export const paddingRight = {
  0: 'pr-0',
  1: 'pr-1',
  2: 'pr-2',
  3: 'pr-3',
  4: 'pr-4',
  5: 'pr-5',
  6: 'pr-6',
  7: 'pr-7',
  8: 'pr-8',
  9: 'pr-9',
  10: 'pr-10',
  11: 'pr-11',
  12: 'pr-12',
};

export const paddingLeft = {
  0: 'pl-0',
  1: 'pl-1',
  2: 'pl-2',
  3: 'pl-3',
  4: 'pl-4',
  5: 'pl-5',
  6: 'pl-6',
  7: 'pl-7',
  8: 'pl-8',
  9: 'pl-9',
  10: 'pl-10',
  11: 'pl-11',
  12: 'pl-12',
};

export const paddingTop = {
  0: 'pt-0',
  1: 'pt-1',
  2: 'pt-2',
  3: 'pt-3',
  4: 'pt-4',
  5: 'pt-5',
  6: 'pt-6',
  7: 'pt-7',
  8: 'pt-8',
  9: 'pt-9',
  10: 'pt-10',
  11: 'pt-11',
  12: 'pt-12',
};

export const paddingBottom = {
  0: 'pb-0',
  1: 'pb-1',
  2: 'pb-2',
  3: 'pb-3',
  4: 'pb-4',
  5: 'pb-5',
  6: 'pb-6',
  7: 'pb-7',
  8: 'pb-8',
  9: 'pb-9',
  10: 'pb-10',
  11: 'pb-11',
  12: 'pb-12',
};

export const alignment = {
  vertical: {
    alignmentX: {
      none: undefined,
      left: 'items-start',
      center: 'items-center',
      right: 'items-end',
    },
    alignmentY: {
      none: undefined,
      top: 'justify-start',
      center: 'justify-center',
      bottom: 'justify-end',
    },
  },
  horizontal: {
    alignmentY: {
      none: undefined,
      top: 'items-start',
      center: 'items-center',
      bottom: 'items-end',
    },
    alignmentX: {
      none: undefined,
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    },
  },
};

export const placeItems = {
  none: undefined,
  left: 'place-items-start',
  center: 'place-items-center',
  right: 'place-items-end',
};

export const textAlign = {
  none: undefined,
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// for responsive reasons we needed to use the `minmax(0, 60ch)` value instead of `fit-content(60ch)`
export const gridColsAlign = {
  left: 'grid-cols-[minmax(0,_var(--maxWidth))_1fr_1fr]',
  center: 'grid-cols-[1fr_minmax(0,_var(--maxWidth))_1fr]',
  right: ' grid-cols-[1fr_1fr_minmax(0,_var(--maxWidth))]',
};

export const gridColumn = {
  left: '[&>*]:col-[1]',
  center: '[&>*]:col-[2]',
  right: '[&>*]:col-[3]',
};

export const aspect = {
  square: 'aspect-[1]',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  widescreen: 'aspect-[16/9]',
  ultrawide: 'aspect-[18/5]',
  golden: 'aspect-[1.6180/1]',
};

export const objectFit = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'unset',
  scaleDown: 'object-scale-down',
};

export const objectPosition = {
  none: undefined,
  bottom: 'object-bottom',
  center: 'object-center',
  left: 'object-left',
  leftBottom: 'object-left-bottom',
  leftTop: 'object-left-top',
  right: 'object-right',
  rightBottom: 'object-right-bottom',
  rightTop: 'object-right-top',
  top: 'object-top',
};

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
};

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

export interface AlignmentProps extends AlignmentProp {}

export type CursorProp = { cursor?: keyof typeof cursorStyle };
export type FontStyleProp = { fontStyle?: keyof typeof textStyle };
export type FontWeightProp = { weight?: keyof typeof fontWeight };
export type FontSizeProp = { fontSize?: keyof typeof textSize };
export type GridColsAlignProp = { align?: keyof typeof gridColsAlign };
export type GridColumn = { align?: keyof typeof gridColumn };
export type GapSpaceProp = { space?: keyof typeof gapSpace };
export type ObjectFitProp = { fit?: keyof typeof objectFit };
export type ObjectPositionProp = { position?: keyof typeof objectPosition };
export type PaddingSpaceProp = { space?: keyof typeof paddingSpace };
export type PaddingSpacePropX = { spaceX?: keyof typeof paddingSpaceX };
export type PaddingSpacePropY = { spaceY?: keyof typeof paddingSpaceY };
export type PaddingRightProp = { pr?: keyof typeof paddingRight };
export type PaddingLeftProp = { pl?: keyof typeof paddingLeft };
export type PaddingTopProp = { pt?: keyof typeof paddingTop };
export type PaddingBottomProp = { pb?: keyof typeof paddingBottom };
export type PlaceItemsProp = { align?: keyof typeof placeItems };
export type TextAlignProp = { align?: keyof typeof textAlign };
