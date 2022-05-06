import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useLocale } from '@react-aria/i18n';
import { useNumberField } from '@react-aria/numberfield';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { useNumberFieldState } from '@react-stately/numberfield';
import { AriaNumberFieldProps } from '@react-types/numberfield';

import { ComponentProps } from '@marigold/types';
import { useStateProps } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Input } from '../Input';

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for some DOM props.
 * Thus, we adjust our regular props to match them.
 */
type CustomProps =
  | 'size'
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'step'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onKeyUp';

export interface NumberFieldProps
  extends Omit<ComponentProps<'input'>, CustomProps>,
    Omit<AriaNumberFieldProps, 'isDisabled' | 'isRequired' | 'isReadOnly'>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ disabled, required, readOnly, error, variant, size, ...rest }, ref) => {
    const props = {
      isDisabled: disabled,
      isRequired: required,
      isReadOnly: readOnly,
      validationState: error ? 'invalid' : 'valid',
      ...rest,
    } as const;
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
    const { focusProps, isFocusVisible } = useFocusRing({
      within: true,
      isTextInput: true,
      autoFocus: props.autoFocus,
    });
    const stateProps = useStateProps({
      hover: isHovered,
      focus: isFocusVisible,
      disabled,
      readOnly,
      error,
    });

    return (
      <FieldBase
        label={props.label}
        labelProps={labelProps}
        required={required}
        description={props.description}
        descriptionProps={descriptionProps}
        error={error}
        errorMessage={props.errorMessage}
        errorMessageProps={errorMessageProps}
        stateProps={stateProps}
        variant={variant}
        size={size}
      >
        <div {...mergeProps(groupProps, focusProps, hoverProps)}>
          <Input
            ref={inputRef}
            variant={variant}
            size={size}
            /**
             * We use `size` for styles which is a string, not like
             * the regular HTML attribute, which is a number
             */
            {...(inputProps as any)}
            {...stateProps}
          />
        </div>
      </FieldBase>
    );
  }
);
