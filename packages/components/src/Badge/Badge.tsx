import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { useStyles } from '@marigold/system';

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
    className={useStyles({ bg: bgColor, borderColor: borderColor })}
    variant={`badge.${variant}`}
    {...props}
  >
    {children}
  </Box>
);
