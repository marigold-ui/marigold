import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { Box, StateAttrProps } from '@marigold/system';

import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
// Props
// ---------------
export interface FieldBaseProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode | { content: ReactNode; side: 'right' | 'left' };
  labelProps?: LabelHTMLAttributes<HTMLLabelElement> & Pick<LabelProps, 'as'>;
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

  const hasLabelSide = typeof label === 'object';
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: hasLabelSide
          ? label.side === 'right'
            ? 'row-reverse'
            : label?.side === 'left'
            ? 'row'
            : 'column'
          : 'column',
        width,
        alignItems: hasLabelSide ? 'baseline' : 'none',
        gap: hasLabelSide ? 'xsmall' : 0,
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
          {hasLabelSide ? label.content : label}
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
