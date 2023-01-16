import React from 'react';
import {
  CSSObject,
  ThemeComponentProps,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box, BoxOwnProps } from '@marigold/system';

// Theme Extension
// ---------------
export interface TextThemeExtension extends ThemeExtension<'Text'> {}

// Props
// ---------------
export interface TextProps
  extends ThemeComponentProps,
    ComponentProps<'p'>,
    Omit<BoxOwnProps, 'variant'> {
  align?: CSSObject['textAlign'];
  color?: string;
  cursor?: string;
  fontSize?: string;
  fontWeight?: string;
  outline?: string;
  children?: React.ReactNode;
}

// Component
// ---------------
export const Text = ({
  variant,
  size,
  align,
  color,
  fontSize,
  fontWeight,
  cursor,
  outline,
  children,
  ...props
}: TextProps) => {
  const styles = useComponentStyles('Text', {
    variant,
    size,
  });
  return (
    <Box
      as="p"
      {...props}
      css={[
        styles,
        { color, cursor, outline, fontSize, fontWeight, textAlign: align },
      ]}
    >
      {children}
    </Box>
  );
};
