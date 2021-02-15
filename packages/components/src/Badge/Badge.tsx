import React from 'react';
import { HTMLProps } from '@marigold/types';
import { Box } from '../Box';

type BadgeProps = {
  variant?: string;
} & HTMLProps<'div'>;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'badge',
  children,
  ...props
}) => (
  <Box {...props} variant={`content.${variant}`}>
    {children}
  </Box>
);
