import React from 'react';
import { useStyles } from '@marigold/system';
import { Exclamation, Required } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { ValidationMessage } from '../ValidationMessage';
import { Label } from '../Label';
import { Box } from '../Box';

type TextareaProps = {
  // how to check if theres a label and then htmlFor is required
  variant?: string;
  label?: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
} & ComponentProps<'textarea'>;

export const Textarea: React.FC<TextareaProps> = ({
  variant = 'textarea',
  htmlFor = 'textarea',
  label,
  error,
  required = false,
  children,
  ...props
}) => {
  let errorColor = '#dd4142';
  const errorClassName = useStyles({ color: errorColor });

  return (
    <Box display="block">
      {label && (
        <Label {...props} htmlFor={htmlFor}>
          {label}
          {(error || required) && (
            <Required size={16} className={errorClassName} />
          )}
        </Label>
      )}
      <Box
        as="textarea"
        display="block"
        border={error && `1px solid ${errorColor}`}
        variant={`form.${variant}`}
        {...props}
      >
        {children}
      </Box>
      {error && (
        <ValidationMessage>
          <Exclamation size={16} />
          {error}
        </ValidationMessage>
      )}
    </Box>
  );
};
