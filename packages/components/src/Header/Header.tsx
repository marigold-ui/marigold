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
export interface HeaderThemeExtension extends ThemeExtension<'Header'> {}

// Props
// ---------------
export interface HeaderProps extends ThemeComponentProps, HtmlProps<'header'> {
  children?: ReactNode;
}

// Component
// ---------------
export const Header = ({ children, variant, size, ...props }: HeaderProps) => {
  const styles = useComponentStyles('Header', { variant, size });
  return (
    <Box as="header" {...props} css={styles}>
      {children}
    </Box>
  );
};
