import React from 'react';
import { ComponentProps } from '@marigold/types';
import { useComponentStyles, ThemeExtension } from '@marigold/system';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface BadgeThemeExtension extends ThemeExtension<'Badge'> {}

// Props
// ---------------
export interface BadgeProps extends ComponentProps<'div'> {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const styles = useComponentStyles('Badge', { variant, size });
  return (
    <Box {...props} css={styles}>
      {children}
    </Box>
  );
};
