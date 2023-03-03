import React from 'react';
import { HtmlProps } from '@marigold/types';
import {
  useComponentStyles,
  ThemeExtension,
  useComponentStylesNEW,
} from '@marigold/system';

import { Box } from '../Box';
import { twMerge } from 'tailwind-merge';

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
  const classes = useComponentStylesNEW('Badge', { variant: variant });
  const classNames = twMerge(classes.baseStyle, classes.variant);
  console.log('classNames', classNames);
  return (
    <Box {...props} className={classNames}>
      {children}
    </Box>
  );
};
