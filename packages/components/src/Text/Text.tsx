import React from 'react';
import {
  CSSObject,
  ThemeComponentProps,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { Box } from '@marigold/system';

// Theme Extension
// ---------------
export interface TextThemeExtension extends ThemeExtension<'Text'> {}

// Props
// ---------------
export interface TextProps extends ThemeComponentProps, HtmlProps<'p'> {
  display?: CSSObject['display'];
  align?: CSSObject['textAlign'];
  color?: string;
  cursor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  outline?: string;
  children?: React.ReactNode;
}

// Component
// ---------------
export const Text = ({
  variant,
  size,
  display,
  align,
  color,
  fontSize,
  fontStyle,
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
        {
          display,
          color,
          cursor,
          outline,
          fontSize,
          fontStyle,
          fontWeight,
          textAlign: align,
        },
      ]}
    >
      {children}
    </Box>
  );
};
