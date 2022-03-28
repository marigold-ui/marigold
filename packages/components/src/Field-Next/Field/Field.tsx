import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { Label } from './Label';
import { Stack } from '../../Stack';
import { HelpText } from './HelpText';

export interface FieldProps {
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
        // TODO: Move error/description logic inside of HelpText!
        <HelpText variant={error ? 'error' : 'description'}>
          {error ? errorMessage : description}
        </HelpText>
      )}
    </Stack>
  );
};
