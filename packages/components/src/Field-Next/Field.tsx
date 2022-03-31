import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { Stack } from '../Stack';

import { Label } from './Label';
import { HelpText } from './HelpText';

export interface FieldProps {
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
}

export const Field: React.FC<FieldProps> = ({
  children,
  disabled,
  required,
  label,
  labelProps,
  description,
  descriptionProps,
  error,
  errorMessage,
  errorMessageProps,
}) => {
  const hasHelpText = !!description || (errorMessage && error);

  return (
    <Stack>
      {label && (
        <Label {...labelProps} required={required}>
          {label}
        </Label>
      )}
      {children}
      {hasHelpText && (
        <HelpText
          disabled={disabled}
          description={description}
          descriptionProps={descriptionProps}
          error={error}
          errorMessage={errorMessage}
          errorMessageProps={errorMessageProps}
        />
      )}
    </Stack>
  );
};
