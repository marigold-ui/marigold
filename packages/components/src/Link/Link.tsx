import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type LinkProps = {
  variant?: string;
} & ComponentProps<'a'>;

export const Link: React.FC<LinkProps> = ({
  variant = 'link',
  children,
  ...props
}) => (
  <Box {...props} as="a" variant={`text.${variant}`}>
    {children}
  </Box>
);
