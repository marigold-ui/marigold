import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type BadgeProps = {
  variant?: string;
  bgColor?: string;
  borderColor?: string;
} & ComponentProps<'div'>;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
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
