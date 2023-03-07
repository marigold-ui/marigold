import React from 'react';
import { HtmlProps } from '@marigold/types';
import { ThemeExtension, useComponentStylessss } from '@marigold/system';

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
  const classNames = useComponentStylessss('Badge');

  console.log(classNames);

  return (
    <Box {...props} className={classNames}>
      {children}
    </Box>
  );
};
