import React, { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { StateAttrProps, cn, createVar, useClassNames } from '@marigold/system';

import { Label, LabelProps } from '../Label';
import { HelpText } from '../HelpText';
import { useFieldGroupContext } from './FieldGroup';

export interface FieldBaseProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
  width?: string;
  disabled?: boolean;
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
      {...stateProps}
      className={cn('group/field', classNames)}
      style={createVar({ fieldWidth: width })}
    >
      {label && (
        <Label
          variant={variant}
          size={size}
          labelWidth={labelWidth}
          {...labelProps}
        >
          {label}
        </Label>
      )}

      {children}
      {hasHelpText && (
        <HelpText
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
