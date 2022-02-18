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
export interface BadgeProps extends ComponentProps<'div'> {
  variant?: string;
  bgColor?: string;
  borderColor?: string;
}

// Component
// ---------------
export const Badge: React.FC<BadgeProps> = ({
  variant = '',
  bgColor = 'transparent',
  borderColor = 'transparent',
  children,
  ...props
}) => (
  <Box
    css={{ bg: bgColor, borderColor: borderColor }}
    variant={`badge.${variant}`}
    {...props}
  >
    {children}
  </Box>
);
