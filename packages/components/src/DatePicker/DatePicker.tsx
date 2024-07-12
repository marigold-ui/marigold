import React, { forwardRef } from 'react';
import { DatePicker, type DateValue } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { WidthProp, useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { DateInput } from '../DateField/DateInput';
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Popover } from '../Overlay/Popover';

type RemovedProps =
  | 'isDisabled'
  | 'isReadOnly'
  | 'isRequired'
  | 'isInvalid'
  | 'style'
  | 'className'
  | 'isOpen';

export interface DatePickerProps
  extends Omit<RAC.DatePickerProps<DateValue>, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  /**
   * If `true`, the date picker is disabled.
   * @default false
   */
  disabled?: RAC.DatePickerProps<DateValue>['isDisabled'];

  /**
   * If `true`, the date picker is required.
   * @default false
   */
  required?: RAC.DatePickerProps<DateValue>['isRequired'];

  /**
   * If `true`, the date picker is readOnly.
   * @default false
   */
  readOnly?: RAC.DatePickerProps<DateValue>['isReadOnly'];

  /**
   * If `true`, the field is considered invalid and if set the errorMessage is shown instead of the `description`.
   * @default false
   */
  error?: RAC.DatePickerProps<DateValue>['isInvalid'];

  /**
   * Whether the calendar is open by default (controlled).
   * @default false
   */
  open?: RAC.DatePickerProps<DateValue>['isOpen'];

  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   */
  width?: WidthProp['width'];
}

const _DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      disabled,
      required,
      readOnly,
      error,
      variant,
      size,
      open,
      granularity = 'day',
      ...rest
    },
    ref
  ) => {
    const props: RAC.DatePickerProps<DateValue> = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      isInvalid: error,
      isOpen: open,
      granularity,
      ...rest,
    };

    const classNames = useClassNames({
      component: 'DatePicker',
      size,
      variant,
    });

    return (
      <FieldBase
        as={DatePicker}
        variant={variant}
        size={size}
        {...props}
        ref={ref}
      >
        <DateInput
          action={
            <div className={classNames.container}>
              <Button
                size="small"
                disabled={disabled}
                className={classNames.button}
              >
                <svg
                  data-testid="action"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  fill="currentColor"
                >
                  <path d="M20.0906 19.2V6.6C20.0906 5.61 19.2806 4.8 18.2906 4.8H17.3906V3H15.5906V4.8H8.39062V3H6.59062V4.8H5.69063C4.69163 4.8 3.89962 5.61 3.89962 6.6L3.89062 19.2C3.89062 20.19 4.69163 21 5.69063 21H18.2906C19.2806 21 20.0906 20.19 20.0906 19.2ZM9.29062 11.1001H7.49061V12.9001H9.29062V11.1001ZM5.69062 8.40009H18.2906V6.60008H5.69062V8.40009ZM18.2906 10.2V19.2H5.69062V10.2H18.2906ZM14.6906 12.9001H16.4906V11.1001H14.6906V12.9001ZM12.8906 12.9001H11.0906V11.1001H12.8906V12.9001Z"></path>
                </svg>
              </Button>
            </div>
          }
        />
        <Popover>
          <Calendar disabled={disabled} />
        </Popover>
      </FieldBase>
    );
  }
);

export { _DatePicker as DatePicker };
