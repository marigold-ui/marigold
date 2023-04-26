import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import {
  Box,
  StateAttrProps,
  useComponentStylesFromTV,
} from '@marigold/system';
import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
import { useFieldGroupContext } from './FieldGroup';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

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

  const classNames = useComponentStylesFromTV('Field', {
    variant,
    size,
  });

  const { labelWidth } = useFieldGroupContext();

  //TODO: width is a dynmic prop, so w-full isn't correct
  const styledDiv = tv({
    base: ['flex flex-col w-full relative'],
  });

  const styledDivColumn = tv({
    base: ['flex flex-col'],
  });

  return (
    <Box {...props} className={twMerge(styledDiv(), classNames)}>
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
      <Box className={styledDivColumn()}>
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
