import React, { useRef } from 'react';
import { useDatePickerState } from '@react-stately/datepicker';
import { AriaDatePickerProps, useDatePicker } from '@react-aria/datepicker';
import { Calendar } from '../Calendar/Calendar';
import { DateField } from '../DateField';
import { Popover } from '../Overlay';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { CalendarDate } from '@internationalized/date';
import { Button } from '../Button';
import { useHover } from '@react-aria/interactions';

export interface DatePickerThemeExtension
  extends ThemeExtensionsWithParts<'DatePicker', ['field', 'actionButton']> {}

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
}

export const DatePicker = ({
  disabled,
  required,
  readonly,
  open,
  error,
  shouldCloseOnSelect = false,
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
  const { hoverProps } = useHover({});
  const styles = useComponentStyles(
    'DatePicker',
    {},
    { parts: ['field', 'actionButton'] }
  );
  const { groupProps, fieldProps, buttonProps, calendarProps } = useDatePicker(
    props,
    state,
    ref
  );
  const { isDisabled, errorMessage, description, label } = props;
  return (
    <>
      <Box
        __baseCSS={{ display: 'flex', minWidth: '300px' }}
        {...groupProps}
        ref={ref}
      >
        <Box
          __baseCSS={{
            width: '100%',
          }}
          css={styles.field}
        >
          <DateField
            {...fieldProps}
            buttonProps={buttonProps}
            label={label}
            isPressed={state.isOpen}
            disabled={disabled}
            required={required}
            errorMessage={errorMessage}
            error={error}
            description={description}
            action={
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  overflow: 'hidden',
                  transform: 'translateX(8px)',
                }}
                css={styles.actionButton}
                {...stateProps}
              >
                <Button
                  {...buttonProps}
                  {...hoverProps}
                  style={{
                    padding: 0,
                    width: '48px',
                    height: '100%',
                  }}
                  disabled={isDisabled}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path d="M20.0906 19.2V6.6C20.0906 5.61 19.2806 4.8 18.2906 4.8H17.3906V3H15.5906V4.8H8.39062V3H6.59062V4.8H5.69063C4.69163 4.8 3.89962 5.61 3.89962 6.6L3.89062 19.2C3.89062 20.19 4.69163 21 5.69063 21H18.2906C19.2806 21 20.0906 20.19 20.0906 19.2ZM9.29062 11.1001H7.49061V12.9001H9.29062V11.1001ZM5.69062 8.40009H18.2906V6.60008H5.69062V8.40009ZM18.2906 10.2V19.2H5.69062V10.2H18.2906ZM14.6906 12.9001H16.4906V11.1001H14.6906V12.9001ZM12.8906 12.9001H11.0906V11.1001H12.8906V12.9001Z"></path>
                  </svg>{' '}
                </Button>
              </Box>
            }
          />
        </Box>
      </Box>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state}>
          <Calendar disabled={disabled} {...calendarProps} />
        </Popover>
      )}
    </>
  );
};
