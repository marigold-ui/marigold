import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface BadgeThemeExtension<Value> {
  badge?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type BadgeProps = {
  variant?: string;
  bgColor?: string;
  borderColor?: string;
} & ComponentProps<'div'>;

// Component
// ---------------
export const Badge: React.FC<BadgeProps> = ({
  variant,
  bgColor = 'transparent',
  borderColor = 'transparent',
  children,
  ...props
}) => (
  <Box
    css={{ bg: bgColor, borderColor: borderColor }}
    variant={variant ? `badge.${variant}` : 'badge'}
    {...props}
  >
    {children}
  </Box>
);
