import React, { ReactNode } from 'react';
import {
  Box,
  useComponentStyles,
  ThemeComponentProps,
  ThemeExtension,
  CSSObject,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface HeadlineThemeExtension extends ThemeExtension<'Headline'> {}

// Props
// ---------------
export interface HeadlineProps
  extends ThemeComponentProps,
    ComponentProps<'h1'> {
  children?: ReactNode;
  level?: '1' | '2' | '3' | '4' | '5' | '6';
  align?: CSSObject['textAlign'];
  color?: string;
}

// Component
// ---------------
export const Headline = ({
  children,
  variant,
  size,
  align,
  color,
  level = '1',
  ...props
}: HeadlineProps) => {
  const styles = useComponentStyles('Headline', {
    variant,
    size: size ?? `level-${level}`,
  });
  return (
    <Box
      as={`h${level}`}
      {...props}
      css={[styles, { color, textAlign: align }]}
    >
      {children}
    </Box>
  );
};
