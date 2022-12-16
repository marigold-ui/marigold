import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import {
  Box,
  StateAttrProps,
  ThemeExtension,
  useComponentStyles,
} from '@marigold/system';

import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
import { useFieldBaseGroupContext } from './FieldBaseGroup';
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
  ...props
}: FieldBaseProps) => {
  const hasHelpText = !!description || (errorMessage && error);

  const style = useComponentStyles('Field', { variant, size });

  const { labelWidth } = useFieldBaseGroupContext();

  return (
    <Box
      {...props}
      __baseCSS={{
        display: 'flex',
        flexDirection: 'column',
        width,
        position: 'relative',
      }}
      css={style}
    >
      {label && (
        <Label
          required={required}
          variant={variant}
          size={size}
          labelWidth={labelWidth}
          {...labelProps}
          {...stateProps}
        >
          {label}
        </Label>
      )}
      <Box __baseCSS={{ display: 'flex', flexDirection: 'column' }}>
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
      </Box>
    </Box>
  );
};
