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

export type AspectProp = { ratio?: keyof typeof aspect };
export type AlignmentXProp = { alignX?: keyof typeof alignmentX };
export type AlignmentYProp = { alignY?: keyof typeof alignmentY };
export type FontWeightProp = { fontWeight?: keyof typeof fontWeight };
export type GridColsAlignProp = { align?: keyof typeof gridColsAlign };
export type GridColumn = { align?: keyof typeof gridColumn };
export type GapSpaceProp = { space?: keyof typeof gapSpace };
export type PaddingSpaceProp = { space?: keyof typeof paddingSpace };
export type PaddingSpacePropX = { spaceX?: keyof typeof paddingSpaceX };
export type PaddingSpacePropY = { spaceY?: keyof typeof paddingSpaceY };
export type PlaceItemsProp = { align?: keyof typeof placeItems };
