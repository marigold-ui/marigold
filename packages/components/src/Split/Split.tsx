import React from 'react';
import { Box } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

export interface SplitProps extends HtmlProps<'div'> {}

export const Split = (props: SplitProps) => (
  <Box {...props} role="separator" css={{ flexGrow: 1 }} />
);
