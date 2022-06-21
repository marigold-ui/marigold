import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useLocale } from '@react-aria/i18n';
import { useNumberField } from '@react-aria/numberfield';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { useNumberFieldState } from '@react-stately/numberfield';
import { Box, useComponentStyles, useStateProps } from '@marigold/system';
import { FieldBase } from '../FieldBase';
import { Input } from '../Input';
import { StepButton } from './StepButton';
// Component
// ---------------
export const NumberField = forwardRef(
  (
    {
      variant,
      size,
      width,
      disabled,
      required,
      readOnly,
      error,
      hideStepper,
      ...rest
    },
    ref
  ) => {
    const props = {
      isDisabled: disabled,
      isRequired: required,
      isReadOnly: readOnly,
      validationState: error ? 'invalid' : 'valid',
      ...rest,
    };
    const showStepper = !hideStepper;
    const { locale } = useLocale();
    const inputRef = useObjectRef(ref);
    const state = useNumberFieldState({ ...props, locale });
    const {
      labelProps,
      groupProps,
      inputProps,
      descriptionProps,
      errorMessageProps,
      incrementButtonProps,
      decrementButtonProps,
    } = useNumberField(props, state, inputRef);
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { focusProps, isFocused } = useFocusRing({
      within: true,
      isTextInput: true,
      autoFocus: props.autoFocus,
    });
    const styles = useComponentStyles(
      'NumberField',
      { variant, size },
      { parts: ['group', 'stepper'] }
    );
    const stateProps = useStateProps({
      hover: isHovered,
      focus: isFocused,
      disabled,
      readOnly,
      error,
    });
    return React.createElement(
      FieldBase,
      {
        label: props.label,
        labelProps: labelProps,
        required: required,
        description: props.description,
        descriptionProps: descriptionProps,
        error: error,
        errorMessage: props.errorMessage,
        errorMessageProps: errorMessageProps,
        stateProps: stateProps,
        variant: variant,
        size: size,
        width: width,
      },
      React.createElement(
        Box,
        {
          'data-group': true,
          __baseCSS: {
            display: 'flex',
            alignItems: 'stretch',
            '> input': {
              flexGrow: 1,
            },
          },
          css: styles.group,
          ...mergeProps(groupProps, focusProps, hoverProps),
          ...stateProps,
        },
        showStepper &&
          React.createElement(StepButton, {
            direction: 'down',
            css: styles.stepper,
            ...decrementButtonProps,
          }),
        React.createElement(Input, {
          ref: inputRef,
          variant: variant,
          size: size,
          ...inputProps,
          ...stateProps,
        }),
        showStepper &&
          React.createElement(StepButton, {
            direction: 'up',
            css: styles.stepper,
            ...incrementButtonProps,
          })
      )
    );
  }
);
//# sourceMappingURL=NumberField.js.map
