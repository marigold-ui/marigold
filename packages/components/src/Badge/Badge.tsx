import React from 'react';
import { HtmlProps } from '@marigold/types';
import {
  ThemeExtension,
  useComponentStylesFromTV,
  useComponentStylessss,
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
  const classNames = useComponentStylesFromTV('Badge', variant);

  console.log('variant', variant);
  console.log(classNames);

  return (
    <Box {...props} className={classNames}>
      {children}
    </Box>
  );
};
