import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { Stack } from '../Stack';

import { Label } from './Label';
import { HelpText } from './HelpText';
import { useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
interface FieldParts<Value> {
  label?: Value;
  helptext?: Value;
  input?: Value;
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
  ...props
}: FieldProps) => {
  const styles = useComponentStyles(
    'Field',
    { variant, size },
    { parts: ['label', 'helptext'] }
  );
  const hasHelpText = !!description || (errorMessage && error);
  return (
    <div {...props}>
      <Stack>
        {label && (
          <Label {...labelProps} required={required} css={styles.label}>
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
            css={styles.helptext}
          />
        )}
      </Stack>
    </div>
  );
};
