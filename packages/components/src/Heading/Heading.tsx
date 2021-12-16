import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface HeadingThemeExtension<Value> {
  heading?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: string;
} & ComponentProps<'h1'>;

// Component
// ---------------
export const Heading: React.FC<HeadingProps> = ({
  as = 'h2',
  variant = 'h2',
  children,
  ...props
}) => (
  <Box {...props} as={as} variant={`heading.${variant}`}>
    {children}
  </Box>
);
