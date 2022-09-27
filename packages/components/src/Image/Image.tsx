import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box, CSSObject } from '@marigold/system';
import { ThemeExtension, useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
export interface ImageThemeExtension extends ThemeExtension<'Image'> {}

// Props
// ---------------
export interface ImageProps extends ComponentProps<'img'> {
  variant?: string;
  size?: string;
  fit?: CSSObject['objectFit'];
  position?: CSSObject['objectPosition'];
  children?: never;
  alt: string;
}

// Component
// ---------------
export const Image = ({
  variant,
  size,
  fit,
  position,
  ...props
}: ImageProps) => {
  const styles = useComponentStyles('Image', { variant, size });
  const css: CSSObject = {
    ...styles,
    objectFit: fit,
    objectPosition: position,
  };
  return (
    <Box
      {...props}
      as="img"
      __baseCSS={fit ? { width: ' 100%', height: '100%' } : {}}
      css={css}
    />
  );
};
