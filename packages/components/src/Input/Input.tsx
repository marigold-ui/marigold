import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

export type InputProps = {
  variant?: string;
} & ComponentProps<'input'>;

export const Input: React.FC<InputProps> = ({
  variant = 'input',
  type = 'text',
  ...props
}) => <Box {...props} as="input" type={type} variant={`form.${variant}`} />;
