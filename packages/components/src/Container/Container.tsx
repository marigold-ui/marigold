import React from 'react';
import { ComponentProps } from '@marigold/types';
import { size as tokenSize } from '@marigold/tokens';

import { Box } from '../Box';

export interface ContainerProps extends ComponentProps<'div'> {
  contentType?: 'content' | 'header';
  size?: keyof typeof tokenSize.content | keyof typeof tokenSize.header;
  align?: 'left' | 'right' | 'center';
}

const ALIGNMENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Container: React.FC<ContainerProps> = ({
  contentType = 'content',
  size = 'medium',
  align = 'left',
  children,
  ...props
}) => (
  <Box
    display="flex"
    flexDirection="column"
    maxWidth={tokenSize[contentType][size]}
    alignItems={ALIGNMENT[align]}
    {...props}
  >
    {children}
  </Box>
);
