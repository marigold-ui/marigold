import React, { ReactNode } from 'react';
import {
  ThemeComponentProps,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';
import { Box } from '../Box';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface HeaderThemeExtension extends ThemeExtension<'Content'> {}

// Props
// ---------------
export interface HeaderProps
  extends ThemeComponentProps,
    ComponentProps<'section'> {
  children?: ReactNode;
}

// Component
// ---------------
export const Header = ({ children, variant, size, ...props }: HeaderProps) => {
  const styles = useComponentStyles('Content', { variant, size });
  return (
    <Box as="header" {...props} css={styles}>
      {children}
    </Box>
  );
};
