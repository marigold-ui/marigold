import React, { ReactNode } from 'react';
import {
  Box,
  useComponentStyles,
  ThemeComponentProps,
  ThemeExtension,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface CardThemeExtension extends ThemeExtension<'Card'> {}

// Props
// ---------------
export interface CardProps extends ThemeComponentProps, ComponentProps<'div'> {
  children?: ReactNode;
}

// Component
// ---------------
export const Card = ({ children, variant, size, ...props }: CardProps) => {
  const styles = useComponentStyles('Card', { variant, size });
  return (
    <Box {...props} css={styles}>
      {children}
    </Box>
  );
};
