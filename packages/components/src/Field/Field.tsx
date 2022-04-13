import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

import { useComponentStyles, StateAttrProps } from '@marigold/system';

import { Stack } from '../Stack';

import { Label } from './Label';
import { HelpText } from './HelpText';

// Theme Extension
// ---------------
interface FieldParts<Value> {
  label?: Value;
  input?: Value;
  helpText?: Value;
}

export interface FieldThemeExtension<Value> {
  Field?: {
    base: FieldParts<Value>;
    variant?: {
      [key: string]: FieldParts<Value>;
    };
    size?: {
      [key: string]: FieldParts<Value>;
    };
  };
}

// Props
// ---------------
export interface FieldProps {
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
export const Field = ({
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
}: FieldProps) => {
  const styles = useComponentStyles(
    'Field',
    { variant, size },
    { parts: ['label', 'helpText'] }
  );

  const hasHelpText = !!description || (errorMessage && error);
  return (
    <Stack>
      {label && (
        <Label
          {...labelProps}
          {...stateProps}
          required={required}
          css={styles.label}
        >
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
          css={styles.helpText}
        />
      )}
    </Stack>
  );
};
