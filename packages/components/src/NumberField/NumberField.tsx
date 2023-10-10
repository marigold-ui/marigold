import { forwardRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useLocale } from '@react-aria/i18n';
import { useHover } from '@react-aria/interactions';
import { useNumberField } from '@react-aria/numberfield';
import { mergeProps, useObjectRef } from '@react-aria/utils';

import { useNumberFieldState } from '@react-stately/numberfield';

import { AriaNumberFieldProps } from '@react-types/numberfield';

import { WidthProp, cn, useClassNames, useStateProps } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Input } from '../Input';
import { StepButton } from './StepButton';

// Theme Extension
// ---------------

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for some DOM props.
 * Thus, we adjust our regular props to match them.
 */
type CustomProps =
  | 'size'
  | 'width'
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'step'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'min'
  | 'max';

export interface NumberFieldProps
  extends Omit<HtmlProps<'input'>, CustomProps | 'className'>,
    Omit<
      AriaNumberFieldProps,
      | 'isDisabled'
      | 'label'
      | 'description'
      | 'errorMessage'
      | 'isRequired'
      | 'isReadOnly'
    >,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  hideStepper?: boolean;
}

// Component
// ---------------
export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
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
    } as const;
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
    const stateProps = useStateProps({
      hover: isHovered,
      focus: isFocused,
      disabled,
      error,
      readOnly,
      required,
    });
    const classNames = useClassNames({
      component: 'NumberField',
      size,
      variant,
    });
    return (
      <FieldBase
        label={props.label}
        labelProps={labelProps}
        description={props.description}
        descriptionProps={descriptionProps}
        error={error}
        errorMessage={props.errorMessage}
        errorMessageProps={errorMessageProps}
        stateProps={stateProps}
        variant={variant}
        size={size}
        width={width}
      >
        <div
          data-group
          className={cn('flex items-stretch', classNames.group)}
          data-testid="number-field-container"
          {...mergeProps(groupProps, focusProps, hoverProps)}
          {...stateProps}
        >
          {showStepper && (
            <StepButton
              className={classNames.stepper}
              direction="down"
              {...decrementButtonProps}
            />
          )}
          <div className="flex-1">
            <Input
              ref={inputRef}
              variant={variant}
              size={size}
              className={{
                input: 'min-w-0 items-stretch  border-none',
              }}
              /**
               * We use `size` for styles which is a string, not like
               * the regular HTML attribute, which is a number
               */
              {...(inputProps as any)}
              {...stateProps}
            />
          </div>
          {showStepper && (
            <StepButton
              className={classNames.stepper}
              direction="up"
              {...incrementButtonProps}
            />
          )}
        </div>
      </FieldBase>
    );
  }
);
