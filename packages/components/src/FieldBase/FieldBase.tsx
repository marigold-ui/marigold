import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import {
  Box,
  StateAttrProps,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';

import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
export interface FieldBaseProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement> & Pick<LabelProps, 'as'>;
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  stateProps?: StateAttrProps;
}
// Theme Extension
// ---------------
export interface FieldThemeExtension extends ThemeExtension<'Field'> {}

// Component
// ---------------
export const FieldBase = ({
  children,
  variant,
  size,
  width = '100%',
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

  const style = useComponentStyles('Field', { variant, size });

  return (
    <Box css={style}>
      {label && (
        <Label
          required={required}
          variant={variant}
          size={size}
          {...labelProps}
          {...stateProps}
        >
          {label}
        </Label>
      )}
      <div>
        {children}
        {hasHelpText && (
          <HelpText
            {...stateProps}
            variant={variant}
            size={size}
            disabled={disabled}
            description={description}
            descriptionProps={descriptionProps}
            error={error}
            errorMessage={errorMessage}
            errorMessageProps={errorMessageProps}
          />
        )}
      </div>
    </Box>
  );
};
