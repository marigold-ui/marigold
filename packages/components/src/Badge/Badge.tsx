import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { useStyles } from 'packages/system/src/useStyles';

export type BadgeProps = {
  variant?: string;
  bgColor?: string;
  borderColor?: string;
} & ComponentProps<'div'>;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  bgColor = 'inherit',
  borderColor = 'transparent',
  children,
  ...props
}) => (
  <Box
    {...props}
    className={useStyles({ bg: bgColor, borderColor: borderColor })}
    variant={`badge.${variant}`}
  >
    {children}
  </Box>
);
