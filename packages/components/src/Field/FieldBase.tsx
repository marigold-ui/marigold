import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { StateAttrProps } from '@marigold/system';

import { Stack } from '../Stack';
import { Label } from './Label';
import { HelpText } from './HelpText';

// Props
// ---------------
export interface FieldBaseProps {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  stateProps?: StateAttrProps;
}

// Component
// ---------------
export const FieldBase = ({
  variant,
  size,
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
  stateProps,
}: FieldBaseProps) => {
  const hasHelpText = !!description || (errorMessage && error);
  return (
    <Stack>
      {label && (
        <Label {...labelProps} {...stateProps} required={required}>
          {label}
        </Label>
      )}
      {children}
      {hasHelpText && (
        <HelpText
          {...stateProps}
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
