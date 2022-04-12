import React, { useRef } from 'react';
import { useFocusWithin, useHover } from '@react-aria/interactions';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import { Box, useComponentStyles, useStateProps } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Field, FieldProps } from '../Field';
import { useFocusRing } from '@react-aria/focus';

// Props
// ---------------
export interface TextFieldProps
  extends Omit<
      ComponentProps<'input'>,
      'value' | 'defaultValue' | 'onChange' | 'onFocus' | 'onBlur'
    >,
    /**
     * `react-aria` has a slightly different API for `onChange`, `onFocus`
     * and `onBlur` events. Thus, we adjust our regular props to match them.
     */
    Pick<AriaTextFieldProps, 'onChange' | 'onFocus' | 'onBlur'>,
    Pick<FieldProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  value?: string;
  defaultValue?: string;
}

// Component
// ---------------
export const TextField = ({
  disabled,
  required,
  readOnly,
  error,
  ...props
}: TextFieldProps) => {
  const { label, description, errorMessage } = props;

  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        isDisabled: disabled,
        isRequired: required,
        isReadOnly: readOnly,
        validationState: error ? 'invalid' : 'valid',
        ...props,
      },
      ref
    );

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({
    hover: isHovered,
    focus: isFocusVisible,
    disabled,
    readOnly,
    invalid: error,
  });

  const styles = useComponentStyles('Field', {}, { parts: ['input'] });

  return (
    <Field
      {...stateProps}
      label={label}
      labelProps={labelProps}
      required={required}
      description={description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={errorMessage}
      errorMessageProps={errorMessageProps}
    >
      <Box
        as="input"
        variant="input"
        ref={ref}
        css={styles.input}
        {...inputProps}
        {...focusProps}
        {...hoverProps}
        {...stateProps}
      />
    </Field>
  );
};
