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
export type ImageProps = {
  variant?: string;
  children?: never;
} & ComponentProps<'img'>;

// Component
// ---------------
export const Image: React.FC<ImageProps> = ({
  variant = 'fullWidth',
  ...props
}) => <Box {...props} as="img" variant={`image.${variant}`} />;
