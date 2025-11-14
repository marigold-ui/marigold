import { CalendarDate } from '@internationalized/date';
import { ReactElement, forwardRef, useContext } from 'react';
import type RAC from 'react-aria-components';
import {
  DateField,
  DateFieldStateContext,
  DateValue,
} from 'react-aria-components';
import { WidthProp } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
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
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;

  /**
   * Optional element (e.g., button or icon) rendered inside the DateField.
   */
  action?: ReactElement<any>;

  /**
   * If `true`, the date field is required.
   * @default false
   */
  required?: RAC.DateFieldProps<DateValue>['isRequired'];

  /**
   * If `true`, the date field is disabled.
   * @default false
   */
  disabled?: RAC.DateFieldProps<DateValue>['isDisabled'];

  /**
   * If `true`, the field is considered invalid and if set the errorMessage is shown instead of the `description`.
   * @default false
   */
  error?: RAC.DateFieldProps<DateValue>['isInvalid'];

  /**
   * If `true`, the date field is readOnly.
   * @default false
   */
  readOnly?: RAC.DateFieldProps<DateValue>['isReadOnly'];

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default 'full'
   */
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
      onChange,
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
        <DateInputWithPasteWrapper onChange={onChange} action={action} />
      </FieldBase>
    );
  }
);

export { _DateField as DateField };

interface DateInputWithPasteWrapperProps {
  onChange?: (value: RAC.DateValue | null) => void;
  action?: ReactElement<any>;
}

const DateInputWithPasteWrapper = ({
  onChange,
  ...props
}: DateInputWithPasteWrapperProps) => {
  const ctx = useContext(DateFieldStateContext);

  const onPaste = (date: CalendarDate) => {
    if (onChange) {
      onChange(date);
    }
    ctx?.setValue(date);
  };

  return <DateInput onPaste={onPaste} {...props} />;
};

// 02.02.2020
