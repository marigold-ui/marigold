import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type LabelProps = {
  htmlFor: string;
  variant?: string;
} & ComponentProps<'label'>;

export const Label: React.FC<LabelProps> = ({
  variant = 'label',
  children,
  ...props
}) => (
  <Box {...props} as="label" variant={`form.${variant}`}>
    {children}
  </Box>
);
