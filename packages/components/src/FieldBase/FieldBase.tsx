import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { StateAttrProps, createVar, useClassNames } from '@marigold/system';

import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
import { useFieldGroupContext } from './FieldGroup';

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

  const { labelWidth } = useFieldGroupContext();
  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
    className: 'w-[--fieldWidth]',
  });

  return (
    <div
      {...props}
      className={classNames}
      style={createVar({ fieldWidth: width })}
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
  );
};
