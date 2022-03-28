import React, { ReactNode, useRef } from 'react';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { useHover } from '@react-aria/interactions';

import { ComponentProps } from '@marigold/types';

export interface TextFieldProps extends ComponentProps<'input'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean;
  errrorMessage?: ReactNode;
}

export const TextField = ({
  disabled,
  required,
  readOnly,
  error,
  ...props
}: TextFieldProps) => {
  let ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        isDisabled: disabled,
        isRequired: required,
        isReadOnly: readOnly,
        validationState: error ? 'invalid' : 'valid',
        /**
         * React's event handler types and react-arias don't work very well together.
         * We just ignore it, since it still works fine. ¯\_(ツ)_/¯
         */
        ...(props as any),
      },
      ref
    );
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });

  // let { label } = props;
  // let ref = React.useRef();

  return <FieldContainer></FieldContainer>;
};
