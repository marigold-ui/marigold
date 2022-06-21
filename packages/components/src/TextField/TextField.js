import React, { useRef } from 'react';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useTextField } from '@react-aria/textfield';
import { useStateProps } from '@marigold/system';
import { FieldBase } from '../FieldBase';
import { Input } from '../Input';
// Component
// ---------------
export const TextField = ({
  variant,
  size,
  width,
  disabled,
  required,
  readOnly,
  error,
  ...props
}) => {
  const { label, description, errorMessage, autoFocus } = props;
  const ref = useRef(null);
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
  const { focusProps, isFocusVisible } = useFocusRing({
    isTextInput: true,
    autoFocus,
  });
  const stateProps = useStateProps({
    hover: isHovered,
    focus: isFocusVisible,
    disabled,
    readOnly,
    error,
  });
  return React.createElement(
    FieldBase,
    {
      label: label,
      labelProps: labelProps,
      required: required,
      description: description,
      descriptionProps: descriptionProps,
      error: error,
      errorMessage: errorMessage,
      errorMessageProps: errorMessageProps,
      stateProps: stateProps,
      variant: variant,
      size: size,
      width: width,
    },
    React.createElement(Input, {
      ref: ref,
      variant: variant,
      size: size,
      ...inputProps,
      ...focusProps,
      ...hoverProps,
      ...stateProps,
    })
  );
};
//# sourceMappingURL=TextField.js.map
