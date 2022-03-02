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
export interface InputProps extends ComponentProps<'input'> {
  variant?: string;
}

// Component
// ---------------
export const Input: React.FC<InputProps> = ({
  variant = '',
  type = 'text',
  ...props
}) => <Box {...props} as="input" type={type} variant={`input.${variant}`} />;
