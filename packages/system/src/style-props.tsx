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
  4: 'gap-4',
  8: 'gap-8',
  16: 'gap-16',
  24: 'gap-24',
  32: 'gap-32',
  40: 'gap-40',
  48: 'gap-48',
};

export const paddingSpace = {
  0: 'p-0',
  4: 'p-4',
  8: 'p-8',
  16: 'p-16',
  24: 'p-24',
  32: 'p-32',
  40: 'p-40',
  48: 'p-48',
};

export const alignX = {
  none: 'initial',
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
};

export const alignY = {
  none: 'initial',
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end',
};

export type AlignmentXProp = { alignX?: keyof typeof alignX };
export type AlignmentYProp = { alignY?: keyof typeof alignY };
export type FontWeightProp = { fontWeight: keyof typeof fontWeight };
export type GapSpaceProp = { space?: keyof typeof gapSpace };
export type PaddingSpaceProp = { paddingSpace: keyof typeof paddingSpace };
