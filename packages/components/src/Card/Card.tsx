import React, { ReactNode } from 'react';
import {
  Box,
  useComponentStyles,
  ThemeComponentProps,
  ThemeExtension,
  ResponsiveStyleValue,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface CardThemeExtension extends ThemeExtension<'Card'> {}

// Props
// ---------------
export interface CardProps extends ThemeComponentProps, HtmlProps<'div'> {
  children?: ReactNode;
  space?: ResponsiveStyleValue<string>;
  p?: ResponsiveStyleValue<string>;
  px?: ResponsiveStyleValue<string>;
  py?: ResponsiveStyleValue<string>;
  pt?: ResponsiveStyleValue<string>;
  pb?: ResponsiveStyleValue<string>;
  pl?: ResponsiveStyleValue<string>;
  pr?: ResponsiveStyleValue<string>;
}

// Component
// ---------------
export const Card = ({
  children,
  variant,
  size,
  space = 'none',
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  ...props
}: CardProps) => {
  const styles = useComponentStyles('Card', { variant, size });
  return (
    <Box
      {...props}
      __baseCSS={{
        display: 'flex',
        flexDirection: 'column',
        gap: space,
      }}
      css={[styles, { p, px, py, pt, pb, pl, pr }]}
    >
      {children}
    </Box>
  );
};
