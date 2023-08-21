import { CalendarDate } from '@internationalized/date';
import { useRef } from 'react';

import { AriaDatePickerProps, useDatePicker } from '@react-aria/datepicker';
import { mergeProps } from '@react-aria/utils';

import { useDatePickerState } from '@react-stately/datepicker';

import { cn, useClassNames, useStateProps } from '@marigold/system';

import { Button } from '../Button';
import { Calendar } from '../Calendar/Calendar';
import { DateField } from '../DateField';
import { Popover } from '../Overlay';

// Props
// -----------------
export interface DatePickerProps
  extends Omit<
    AriaDatePickerProps<CalendarDate>,
    'isDisabled' | 'isRequired' | 'isReadOnly' | 'isOpen'
  > {
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  open?: boolean;
  error?: boolean;
  shouldCloseOnSelect?: boolean;
  variant?: string;
  size?: string;
}

// Component
// -----------------
export const DatePicker = ({
  disabled,
  required,
  readonly,
  open,
  error,
  shouldCloseOnSelect,
  variant,
  size,
  ...rest
}: DatePickerProps) => {
  const props: AriaDatePickerProps<CalendarDate> = {
    isDisabled: disabled,
    isReadOnly: readonly,
    isRequired: required,
    isOpen: open,
    ...rest,
  };
  const state = useDatePickerState({
    shouldCloseOnSelect,
    ...props,
  });

  const ref = useRef(null);
  const stateProps = useStateProps({
    focus: state.isOpen,
  });
  const { groupProps, fieldProps, buttonProps, calendarProps } = useDatePicker(
    props,
    state,
    ref
  );

  const { isDisabled, errorMessage, description, label } = props;
  const classNames = useClassNames({
    component: 'DatePicker',
    size,
    variant,
  });
  return (
    <>
      <div className="flex w-full min-w-[300px]" {...groupProps}>
        <DateField
          {...fieldProps}
          label={label}
          isPressed={state.isOpen}
          disabled={disabled}
          required={required}
          errorMessage={errorMessage}
          error={error}
          description={!state.isOpen && description}
          triggerRef={ref}
          action={
            <div className={classNames.container}>
              <Button
                {...mergeProps(buttonProps, stateProps)}
                className={cn('absolute right-0 top-0', classNames.button)}
                disabled={isDisabled}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.0906 19.2V6.6C20.0906 5.61 19.2806 4.8 18.2906 4.8H17.3906V3H15.5906V4.8H8.39062V3H6.59062V4.8H5.69063C4.69163 4.8 3.89962 5.61 3.89962 6.6L3.89062 19.2C3.89062 20.19 4.69163 21 5.69063 21H18.2906C19.2806 21 20.0906 20.19 20.0906 19.2ZM9.29062 11.1001H7.49061V12.9001H9.29062V11.1001ZM5.69062 8.40009H18.2906V6.60008H5.69062V8.40009ZM18.2906 10.2V19.2H5.69062V10.2H18.2906ZM14.6906 12.9001H16.4906V11.1001H14.6906V12.9001ZM12.8906 12.9001H11.0906V11.1001H12.8906V12.9001Z"></path>
                </svg>
              </Button>
            </div>
          }
        />
      </div>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state}>
          <Calendar disabled={disabled} {...calendarProps} />
        </Popover>
      )}
    </>
  );
};
