import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

type ImageProps = {
  variant?: string;
  children?: never;
} & ComponentProps<'img'>;

export const Image: React.FC<ImageProps> = ({
  variant = 'images',
  ...props
}) => <Box {...props} as="img" variant={`content.${variant}`} />;
