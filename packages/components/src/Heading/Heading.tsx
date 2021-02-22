import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

type HeadingProps = {
  variant?: string;
} & ComponentProps<'h1'>;

export const Heading: React.FC<HeadingProps> = ({
  variant = 'h2',
  children,
  ...props
}) => (
  <Box {...props} as="h2" variant={`text.${variant}`}>
    {children}
  </Box>
);
