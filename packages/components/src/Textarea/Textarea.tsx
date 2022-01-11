import React from 'react';
import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { ValidationMessage } from '../ValidationMessage';
import { Label } from '../Label';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface TextareaThemeExtension<Value> {
  textarea?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type TextareaProps = {
  variant?: string;
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
} & ComponentProps<'textarea'>;

// Component
// ---------------
export const Textarea: React.FC<TextareaProps> = ({
  variant = '',
  htmlFor = 'textarea',
  label,
  error,
  errorMessage,
  required,
  className = '',
  children,
  ...props
}) => (
  <Box>
    {label && (
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
    )}
    <Box
      as="textarea"
      {...props}
      display="block"
      variant={`textarea.${variant}`}
      css={{ outlineColor: error && 'error' }}
      className={className}
    />
    {error && errorMessage && (
      <ValidationMessage>
        <Exclamation size={16} />
        {errorMessage}
      </ValidationMessage>
    )}
  </Box>
);
