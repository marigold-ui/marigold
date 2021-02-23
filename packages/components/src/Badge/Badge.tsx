import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type BadgeProps = {
  variant?: string;
} & ComponentProps<'div'>;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'badge',
  children,
  ...props
}) => (
  <Box {...props} variant={`content.${variant}`}>
    {children}
  </Box>
);
