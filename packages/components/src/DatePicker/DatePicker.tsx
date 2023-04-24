import React, { useRef } from 'react';
import { useDatePickerState } from '@react-stately/datepicker';
import { AriaDatePickerProps, useDatePicker } from '@react-aria/datepicker';
import { Calendar } from '../Calendar/Calendar';
import { Calendar as CalendarIcon, SmilieSatisfied } from '@marigold/icons';
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
            icon={<SmilieSatisfied />}
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
                  <CalendarIcon />
                </Button>
              </Box>
            }
          />
        </Box>
      </Box>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state}>
          <Calendar {...calendarProps} />
        </Popover>
      )}
    </>
  );
};
