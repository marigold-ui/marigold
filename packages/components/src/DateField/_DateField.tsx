import { ReactElement, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { DateField, DateInput, DateValue, Group } from 'react-aria-components';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { FieldBaseProps } from '../FieldBase';
import { FieldBase } from '../FieldBase/_FieldBase';
import { DateSegment } from './_DateSegment';

type RemovedProps =
  | 'className'
  | 'isRequired'
  | 'isDisabled'
  | 'isInvalid'
  | 'isReadOnly'
  | 'label'
  | 'style';

export interface DateFieldProps
  extends Omit<RAC.DateFieldProps<DateValue>, RemovedProps>,
    Pick<FieldBaseProps, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;
  action?: ReactElement;
  label?: FieldBaseProps['label'];
  required?: RAC.DateFieldProps<DateValue>['isRequired'];
  disabled?: RAC.DateFieldProps<DateValue>['isDisabled'];
  error?: RAC.DateFieldProps<DateValue>['isInvalid'];
  readOnly?: RAC.DateFieldProps<DateValue>['isReadOnly'];
  width?: WidthProp['width'];
}

const _DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      variant,
      size,
      action,
      disabled,
      required,
      error,
      readOnly,
      ...rest
    }: DateFieldProps,
    ref
  ) => {
    const props: RAC.DateFieldProps<DateValue> = {
      isDisabled: disabled,
      isReadOnly: readOnly,
      isInvalid: error,
      isRequired: required,
      ...rest,
    };

    const classNames = useClassNames({ component: 'DateField', variant, size });
    return (
      <FieldBase
        as={DateField}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        <Group className={cn('flex flex-1 items-center', classNames.field)}>
          <DateInput className={cn('flex flex-1 items-center')}>
            {segment => (
              <DateSegment
                className={cn(
                  'group/segment',
                  'text-center leading-none outline-0',
                  '[data-type="literal]"' && 'p-[0.75px]',
                  classNames.segment
                )}
                segment={segment}
              />
            )}
          </DateInput>
          {action ? (
            action
          ) : (
            <div className="flex items-center justify-center">
              <svg
                data-testid="action"
                className={cn(classNames.action)}
                viewBox="0 0 24 24"
                width={24}
                height={24}
              >
                <path d="M20.0906 19.2V6.6C20.0906 5.61 19.2806 4.8 18.2906 4.8H17.3906V3H15.5906V4.8H8.39062V3H6.59062V4.8H5.69063C4.69163 4.8 3.89962 5.61 3.89962 6.6L3.89062 19.2C3.89062 20.19 4.69163 21 5.69063 21H18.2906C19.2806 21 20.0906 20.19 20.0906 19.2ZM9.29062 11.1001H7.49061V12.9001H9.29062V11.1001ZM5.69062 8.40009H18.2906V6.60008H5.69062V8.40009ZM18.2906 10.2V19.2H5.69062V10.2H18.2906ZM14.6906 12.9001H16.4906V11.1001H14.6906V12.9001ZM12.8906 12.9001H11.0906V11.1001H12.8906V12.9001Z"></path>
              </svg>
            </div>
          )}
        </Group>
      </FieldBase>
    );
  }
);

export { _DateField as DateField };
