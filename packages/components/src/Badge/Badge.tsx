import React from 'react';
import { HtmlProps } from '@marigold/types';
import {
  useComponentStyles,
  ThemeExtension,
  useComponentStylesNEW,
} from '@marigold/system';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface BadgeThemeExtension extends ThemeExtension<'Badge'> {}

// Props
// ---------------
export interface BadgeProps extends HtmlProps<'div'> {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const styles = useComponentStylesNEW('Badge', { variant });
  return (
    <Box {...props} css={styles}>
      {children}
    </Box>
  );
};
