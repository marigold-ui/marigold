import React, { HTMLAttributes, ReactElement, useRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import { useDateFieldState } from '@react-stately/datepicker';
import { AriaDateFieldProps, useDateField } from '@react-aria/datepicker';
import { createCalendar, DateValue } from '@internationalized/date';
import { cn, useClassNames, useStateProps } from '@marigold/system';
import { DateSegment } from './DateSegment';
import { FieldBase } from '../FieldBase';
import { mergeProps } from '@react-aria/utils';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';

// Props
// ----------------
export interface DateFieldProps
  extends Omit<
    AriaDateFieldProps<DateValue>,
    'isDisabled' | 'isReadOnly' | 'isRequired'
  > {
  onChange?: (value: DateValue) => void;
  value?: DateValue | null;
  defaultValue?: DateValue | null;
  ref?: React.RefObject<unknown> | undefined;
  triggerRef?: React.RefObject<HTMLDivElement> | undefined;
  action?: ReactElement;
  isPressed?: boolean;
  error?: boolean;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  variant?: string;
  size?: string;
}

// Component
// ----------------
export const DateField = ({
  disabled,
  readOnly,
  required,
  error,
  errorMessage,
  errorMessageProps,
  variant,
  size,
  action,
  isPressed,
  triggerRef,
  ...res
}: DateFieldProps) => {
  const { locale } = useLocale();
  const props: AriaDateFieldProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    ...res,
  };
  const { label, description } = props;
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps, labelProps, descriptionProps } = useDateField(
    props,
    state,
    ref
  );

  const classNames = useClassNames({ component: 'DateField', variant, size });

  const { focusProps, isFocused } = useFocusRing({
    within: true,
    isTextInput: true,
    autoFocus: props.autoFocus,
  });

  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });

  const stateProps = useStateProps({
    hover: isHovered,
    error,
    disabled,
    required,
    focus: isFocused || isPressed,
  });

  return (
    <FieldBase
      error={error}
      errorMessage={errorMessage}
      errorMessageProps={errorMessageProps}
      label={label}
      labelProps={labelProps}
      description={description}
      descriptionProps={descriptionProps}
      disabled={disabled}
      stateProps={stateProps}
      variant={variant}
      size={size}
    >
      <div
        {...mergeProps(fieldProps, focusProps, stateProps, hoverProps)}
        className={cn(
          'relative flex flex-row flex-nowrap',
          'cursor-text aria-disabled:cursor-not-allowed',
          classNames.field
        )}
        data-testid="date-field"
        ref={triggerRef}
      >
        <div ref={ref} className="flex basis-full items-center">
          {state.segments.map((segment, i) => (
            <DateSegment
              className={classNames.segment}
              isPrevPlaceholder={state.segments[i - 1]?.isPlaceholder}
              key={i}
              segment={segment}
              state={state}
            />
          ))}
        </div>
        {action ? (
          action
        ) : (
          <div className="flex items-center justify-center">
            <svg
              data-testid="a
              ction"
              className={cn(classNames.action)}
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path d="M20.0906 19.2V6.6C20.0906 5.61 19.2806 4.8 18.2906 4.8H17.3906V3H15.5906V4.8H8.39062V3H6.59062V4.8H5.69063C4.69163 4.8 3.89962 5.61 3.89962 6.6L3.89062 19.2C3.89062 20.19 4.69163 21 5.69063 21H18.2906C19.2806 21 20.0906 20.19 20.0906 19.2ZM9.29062 11.1001H7.49061V12.9001H9.29062V11.1001ZM5.69062 8.40009H18.2906V6.60008H5.69062V8.40009ZM18.2906 10.2V19.2H5.69062V10.2H18.2906ZM14.6906 12.9001H16.4906V11.1001H14.6906V12.9001ZM12.8906 12.9001H11.0906V11.1001H12.8906V12.9001Z"></path>
            </svg>
          </div>
        )}
      </div>
    </FieldBase>
  );
};
