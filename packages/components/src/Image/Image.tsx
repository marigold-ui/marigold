import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
export interface ImageThemeExtension<Value> {
  Image?: {
    base: Value;
    variant?: {
      [key: string]: Value;
    };
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
export const Image = ({ variant, ...props }: ImageProps) => {
  const styles = useComponentStyles('Image', { variant });
  return <Box {...props} as="img" css={styles} />;
};
