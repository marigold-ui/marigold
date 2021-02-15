import React from 'react';
import { HTMLProps } from '@marigold/types';
import { Box } from '../Box';

type AlertProps = {
  variant?: string;
} & HTMLProps<'div'>;

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  children,
  ...props
}) => (
  <Box
    {...props}
    display="flex"
    alignItems="center"
    px={3}
    py={2}
    borderRadius={4}
    variant={`alerts.${variant}`}
  >
    {children}
  </Box>
);
