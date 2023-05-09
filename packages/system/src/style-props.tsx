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
};

export const alignmentX = {
  none: undefined,
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
};

export const alignmentY = {
  none: undefined,
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end',
};

export type AlignmentXProp = { alignX?: keyof typeof alignmentX };
export type AlignmentYProp = { alignY?: keyof typeof alignmentY };
export type FontWeightProp = { fontWeight?: keyof typeof fontWeight };
export type GapSpaceProp = { space?: keyof typeof gapSpace };
export type PaddingSpaceProp = { paddingSpace?: keyof typeof paddingSpace };
