import { ReactElement, forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { DateField, DateValue } from 'react-aria-components';

import { WidthProp } from '@marigold/system';

import { FieldBaseProps } from '../FieldBase';
import { FieldBase } from '../FieldBase';
import { DateInput } from './DateInput';

type RemovedProps =
  | 'className'
  | 'isRequired'
  | 'isDisabled'
  | 'isInvalid'
  | 'isReadOnly'
  | 'label'
  | 'children'
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

    return (
      <FieldBase
        as={DateField}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        <DateInput action={action} />
      </FieldBase>
    );
  }
);

export { _DateField as DateField };
