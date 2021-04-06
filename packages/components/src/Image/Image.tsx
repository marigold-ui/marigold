import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type ImageProps = {
  variant?: string;
  children?: never;
} & ComponentProps<'img'>;

export const Image: React.FC<ImageProps> = ({
  variant = 'fullWidth',
  ...props
}) => <Box {...props} as="img" variant={`images.${variant}`} />;
