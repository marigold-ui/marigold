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
export interface ContentThemeExtension extends ThemeExtension<'Content'> {}

// Props
// ---------------
export interface ContentProps
  extends ThemeComponentProps,
    ComponentProps<'section'> {
  children?: ReactNode;
}

// Component
// ---------------
export const Content = ({
  children,
  variant,
  size,
  ...props
}: ContentProps) => {
  const styles = useComponentStyles('Content', { variant, size });
  return (
    <Box as="section" {...props} css={styles}>
      {children}
    </Box>
  );
};
