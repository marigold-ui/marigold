import { HTMLAttributes, ReactNode } from 'react';
import type { ValidationResult } from 'react-aria-components';

import {
  StateAttrProps,
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';

import { HelpText } from '../HelpText';
import { Label, LabelProps } from '../Label';

export interface FieldBaseProps extends WidthProp {
  children?: ReactNode;
  variant?: string;
  size?: string;
  disabled?: boolean;
  label?: ReactNode;
  labelProps?: LabelProps;
  description?: ReactNode;
  descriptionProps?: Omit<HTMLAttributes<HTMLElement>, 'children'>;
  error?: boolean;
  errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
  errorMessageProps?: Omit<HTMLAttributes<HTMLElement>, 'children'>;
  stateProps?: StateAttrProps;
}

// Component
// ---------------
export const FieldBase = ({
  children,
  variant,
  size,
  width = 'full',
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
  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
  });

  return (
    <div
      {...props}
      {...stateProps}
      className={cn('group/field', twWidth[width], classNames)}
    >
      {label ? (
        <Label variant={variant} size={size} {...labelProps}>
          {label}
        </Label>
      ) : (
        <span aria-hidden="true" />
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
