import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { Box, StateAttrProps } from '@marigold/system';

import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
import { NONAME } from 'dns';

// Props
// ---------------
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
  side?: 'right' | 'left';
}

// Component
// ---------------
export const FieldBase = ({
  children,
  variant,
  size,
  side,
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
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection:
          side === 'right' ? 'row-reverse' : side === 'left' ? 'row' : 'column',
        width,
        gap: side ? 'xsmall' : 0,
      }}
    >
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
