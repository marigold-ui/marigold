import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type LabelProps = {
  htmlFor: string;
  variant?: string;
} & ComponentProps<'label'>;

export const Label: React.FC<LabelProps> = ({
  variant = 'default',
  children,
  ...props
}) => (
  <Box {...props} as="label" variant={`label.${variant}`}>
    {children}
  </Box>
);
