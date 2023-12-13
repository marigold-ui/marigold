import { useRef } from 'react';
import { DatePicker, type DateValue, Dialog } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { WidthProp, useClassNames } from '@marigold/system';

import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { DateField } from '../DateField/_DateField';
import { FieldBaseProps } from '../FieldBase/_FieldBase';
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
  disabled?: RAC.DatePickerProps<DateValue>['isDisabled'];
  required?: RAC.DatePickerProps<DateValue>['isRequired'];
  readOnly?: RAC.DatePickerProps<DateValue>['isReadOnly'];
  error?: RAC.DatePickerProps<DateValue>['isInvalid'];
  open?: RAC.DatePickerProps<DateValue>['isOpen'];
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
}

const _DatePicker = ({
  disabled,
  required,
  readOnly,
  error,
  variant,
  size,
  open,
  width,
  label,
  description,
  errorMessage,
  ...rest
}: DatePickerProps) => {
  const props: RAC.DatePickerProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isOpen: open,
    ...rest,
  };

  const classNames = useClassNames({
    component: 'DatePicker',
    size,
    variant,
  });

  console.log(open);
  const ref = useRef(null);

  return (
    <DatePicker {...props}>
      <DateField
        ref={ref}
        label={label}
        required={required}
        error={error}
        width={width}
        description={description}
        errorMessage={errorMessage}
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
      <Popover triggerRef={ref}>
        <Calendar disabled={disabled} />
      </Popover>
    </DatePicker>
  );
};

export { _DatePicker as DatePicker };
