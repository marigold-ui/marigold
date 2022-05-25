import React from 'react';
import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

export interface SplitProps extends ComponentProps<'div'> {}

export const Split = (props: SplitProps) => (
  <Box {...props} css={{ flexGrow: 1 }} />
);
