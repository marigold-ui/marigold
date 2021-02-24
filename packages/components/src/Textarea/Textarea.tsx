import React from 'react';
import { useStyles } from '@marigold/system';
import { Exclamation, Required } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { ValidationMessage } from '../ValidationMessage';
import { Label } from '../Label';
import { Box } from '../Box';

export type TextareaProps = {
  variant?: string;
} & ComponentProps<'textarea'>;

type withLabelProps = TextareaProps & {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
};

type noLabelProps = TextareaProps & {
  label?: never;
  htmlFor?: never;
  error?: never;
  required?: never;
};

const Textarea = (props: withLabelProps) => {};
const Textarea = (props: noLabelProps) => {};
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
