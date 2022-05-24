import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { ThemeExtension, useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
export interface ImageThemeExtension extends ThemeExtension<'Image'> {}

// Props
// ---------------
export interface ImageProps extends ComponentProps<'img'> {
  variant?: string;
  size?: string;
  children?: never;
}

// Component
// ---------------
export const Image = ({ variant, ...props }: ImageProps) => {
  const styles = useComponentStyles('Image', { variant });
  return <Box {...props} as="img" css={styles} />;
};
