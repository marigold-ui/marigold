// Components
export { SVG } from './components/SVG/SVG';
export type { SVGProps } from './components/SVG/SVG';
export { DateFormat } from './components/Formatters/DateFormat';
export { NumericFormat } from './components/Formatters/NumericFormat';
export type { NumerFormatterOptions } from './components/Formatters/NumericFormat';

// Hooks
export { useClassNames } from './hooks/useClassNames';
export type {
  UseClassNamesProps,
  ComponentClassNames,
} from './hooks/useClassNames';
export { useResponsiveValue } from './hooks/useResponsiveValue';
export { useStateProps } from './hooks/useStateProps';
export type {
  ComponentState,
  StateAttrKeyProps,
  StateAttrProps,
  UseStateProps,
} from './hooks/useStateProps';
export { useTheme, ThemeProvider } from './hooks/useTheme';
export type { ThemeProviderProps } from './hooks/useTheme';
export { useSmallScreen } from './hooks/useSmallScreen';
export { extendTheme } from './hooks/extendTheme';
export type { StylesProps } from './hooks/extendTheme';

// Types
export type {
  NestedStringObject,
  ComponentStyleFunction,
  Theme,
  ComponentNames,
  ThemeComponent,
  ThemeComponentParts,
} from './types/theme';

// Default Theme
export { defaultTheme } from './defaultTheme';

// Style Props - only export what exists
export {
  width,
  maxWidth,
  height,
  fontWeight,
  textSize,
  textStyle,
  textWrap,
  whiteSpace,
  gapSpace,
  paddingSpace,
  paddingSpaceX,
  paddingSpaceY,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  alignment,
  placeItems,
  textAlign,
  aspect,
  cursorStyle,
} from './style-props';
export type {
  AspectProp,
  AlignmentProp,
  CursorProp,
  FontStyleProp,
  TextWrapProp,
  WhiteSpaceProps,
  FontWeightProp,
  FontSizeProp,
  GapSpaceProp,
  PaddingSpaceProp,
  PaddingSpacePropX,
  PaddingSpacePropY,
  PaddingRightProp,
  PaddingLeftProp,
  PaddingTopProp,
  PaddingBottomProp,
  PlaceItemsProp,
  TextAlignProp,
  SpaceProp,
  WidthProp,
  MaxWidthProp,
  HeightProp,
} from './style-props';

// Utils
export type {
  ClassValue,
  VariantProps,
  ConfigSchema,
  ConfigVariants,
  ConfigVariantsMulti,
  Config,
  Props,
} from './utils/className.utils';
export { cva, cn } from './utils/className.utils';
export type { Scale, ScaleValue } from './utils/css-variables.utils';
export {
  createVar,
  createSpacingVar,
  ensureCssVar,
  isScale,
  isValidCssCustomPropertyName,
} from './utils/css-variables.utils';
export { get } from './utils/object.utils';
