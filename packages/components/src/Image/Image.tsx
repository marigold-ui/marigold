import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface ImageThemeExtension<Value> {
  image?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface ImageProps extends ComponentProps<'img'> {
  variant?: string;
  children?: never;
}

// Component
// ---------------
export const Image: React.FC<ImageProps> = ({
  variant = 'fullWidth',
  ...props
}) => <Box {...props} as="img" variant={`image.${variant}`} />;
