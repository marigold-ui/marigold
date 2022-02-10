import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

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
  htmlFor: string;
  required?: boolean;
  error?: boolean;
} & AriaTextFieldProps &
  ComponentProps<'textarea'>;

// Component
// ---------------
export const Textarea: React.FC<TextareaProps> = ({
  variant = '',
  htmlFor,
  error,
  errorMessage,
  required,
  children,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { labelProps, inputProps, errorMessageProps } = useTextField(
    {
      ...props,
      inputElementType: 'textarea',
    },
    ref
  );

  return (
    <Box>
      <Label htmlFor={htmlFor} required={required} {...labelProps}>
        {props.label}
      </Label>
      <Box
        as="textarea"
        variant={`textarea.${variant}`}
        css={{
          outlineColor: error && 'error',
        }}
        {...inputProps}
        ref={ref}
        {...props}
      />
      {error && errorMessage && (
        <ValidationMessage {...errorMessageProps}>
          <Exclamation size={16} />
          {errorMessage}
        </ValidationMessage>
      )}
    </Box>
  );
};
