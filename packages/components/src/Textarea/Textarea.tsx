import React from 'react';
import { useStyles } from '@marigold/system';
import { Exclamation, Required } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { ValidationMessage } from '../ValidationMessage';
import { Label } from '../Label';
import { Box } from '../Box';

export type TextareaProps = {
  variant?: string;
  label?: string;
  htmlFor?: string;
  errorMessage?: string;
  required?: boolean;
} & ComponentProps<'textarea'>;

export const Textarea: React.FC<TextareaProps> = ({
  variant = 'textarea',
  htmlFor = 'textarea',
  label,
  errorMessage,
  required = false,
  className = '',
  children,
  ...props
}) => {
  const errorClassName = useStyles({ color: 'red60' });
  const textareaClassNames = useStyles(
    { outlineColor: errorMessage && 'red60' },
    className
  );

  return (
    <Box>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {(errorMessage || required) && (
            <Required size={16} className={errorClassName} />
          )}
        </Label>
      )}
      <Box
        as="textarea"
        {...props}
        display="block"
        variant={`form.${variant}`}
        className={textareaClassNames}
      />
      {errorMessage && (
        <ValidationMessage>
          <Exclamation size={16} />
          {errorMessage}
        </ValidationMessage>
      )}
    </Box>
  );
};
