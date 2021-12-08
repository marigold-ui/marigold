import React from 'react';
import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { ValidationMessage } from '../ValidationMessage';
import { Label } from '../Label';
import { Box } from '../Box';

export type TextareaProps = {
  variant?: string;
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
} & ComponentProps<'textarea'>;

export const Textarea: React.FC<TextareaProps> = ({
  variant = 'default',
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
