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
  variant = 'default',
  htmlFor = 'textarea',
  label,
  errorMessage,
  required = false,
  className = '',
  children,
  ...props
}) => {
  const errorClassName = useStyles({ css: { color: 'error' } });
  const textareaClassNames = useStyles({
    css: { outlineColor: errorMessage && 'error' },
    className,
  });

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
        variant={`textarea.${variant}`}
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
