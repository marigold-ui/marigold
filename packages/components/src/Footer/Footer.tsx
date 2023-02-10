import React, { ReactNode } from 'react';
import {
  ThemeComponentProps,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';
import { Box } from '../Box';
import { HtmlProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface FooterThemeExtension extends ThemeExtension<'Footer'> {}

// Props
// ---------------
export interface FooterProps extends ThemeComponentProps, HtmlProps<'footer'> {
  children?: ReactNode;
}

// Component
// ---------------
export const Footer = ({ children, variant, size, ...props }: FooterProps) => {
  const styles = useComponentStyles('Footer', { variant, size });
  return (
    <Box as="footer" {...props} css={styles}>
      {children}
    </Box>
  );
};
