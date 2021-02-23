import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: string;
} & ComponentProps<'h1'>;

export const Heading: React.FC<HeadingProps> = ({
  as = 'h2',
  variant = 'h2',
  children,
  ...props
}) => (
  <Box {...props} as={as} variant={`text.${variant}`}>
    {children}
  </Box>
);
