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

export const alignmentY = {
  none: undefined,
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
};

export const alignmentX = {
  none: undefined,
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
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
  none: 'object-none',
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
export type AlignmentXProp = { alignX?: keyof typeof alignmentX };
export type AlignmentYProp = { alignY?: keyof typeof alignmentY };
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
export type PlaceItemsProp = { align?: keyof typeof placeItems };
export type TextAlignProp = { align?: keyof typeof textAlign };
