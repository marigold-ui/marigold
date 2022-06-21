import React from 'react';
import {
  CSSObject,
  ThemeComponentProps,
  ThemeExtension,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { BoxOwnProps } from '@marigold/system';
export interface TextThemeExtension extends ThemeExtension<'Text'> {}
export interface TextProps
  extends ThemeComponentProps,
    ComponentProps<'p'>,
    Omit<BoxOwnProps, 'variant'> {
  align?: CSSObject['textAlign'];
  color?: string;
  cursor?: string;
  fontSize?: string;
  outline?: string;
  children?: React.ReactNode;
}
export declare const Text: ({
  variant,
  size,
  align,
  color,
  fontSize,
  cursor,
  outline,
  children,
  ...props
}: TextProps) => JSX.Element;
//# sourceMappingURL=Text.d.ts.map
