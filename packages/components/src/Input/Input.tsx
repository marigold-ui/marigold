import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface InputThemeExtension<Value> {
  input?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type InputProps = {
  variant?: string;
} & ComponentProps<'input'>;

// Component
// ---------------
export const Input: React.FC<InputProps> = ({
  variant,
  type = 'text',
  ...props
}) => (
  <Box
    {...props}
    as="input"
    type={type}
    variant={variant ? `input.${variant}` : 'input'}
  />
);
