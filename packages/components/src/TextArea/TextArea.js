import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { Box, useComponentStyles, useStateProps } from '@marigold/system';
import { FieldBase } from '../FieldBase';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
// Component
// ---------------
export const TextArea = ({
  variant,
  size,
  width,
  disabled,
  required,
  readOnly,
  error,
  rows,
  ...props
}) => {
  const { label, description, errorMessage } = props;
  const ref = useRef(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        inputElementType: 'textarea',
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
    error,
  });
  const styles = useComponentStyles('TextArea', { variant, size });
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
    React.createElement(Box, {
      as: 'textarea',
      css: styles,
      ref: ref,
      rows: rows,
      ...inputProps,
      ...focusProps,
      ...hoverProps,
      ...stateProps,
    })
  );
};
//# sourceMappingURL=TextArea.js.map
