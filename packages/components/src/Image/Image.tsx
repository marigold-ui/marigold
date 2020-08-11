import React from 'react';
import { Box, system } from '@marigold/system';

type ImageProps = {};

export const Image = system<ImageProps, 'img'>(
  ({ variant = 'images', children, ...props }) => {
    return <Box as="img" themeSection="content" variant={variant} {...props} />;
  }
);
