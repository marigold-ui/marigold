import { CalendarDate } from '@internationalized/date';
import { ReactElement, forwardRef, useContext } from 'react';
import type RAC from 'react-aria-components';
import {
  DatePicker,
  DatePickerStateContext,
  type DateValue,
  Dialog,
} from 'react-aria-components';
import { WidthProp, useClassNames, useSmallScreen } from '@marigold/system';
import { Calendar } from '../Calendar/Calendar';
import { DateInput } from '../DateField/DateInput';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { Popover } from '../Overlay/Popover';
import { Tray } from '../Tray/Tray';
import { Calendar as CalendarIcon } from '../icons/Calendar';

type RemovedProps =
  | 'isDisabled'
  | 'isDateUnavailable'
  | 'isReadOnly'
  | 'isRequired'
  | 'isInvalid'
  | 'style'
  | 'className'
  | 'isOpen';

export interface DatePickerProps
  extends
    Omit<RAC.DatePickerProps<DateValue>, RemovedProps>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
   */

  dateUnavailable?: RAC.DatePickerProps<DateValue>['isDateUnavailable'];
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
      dateUnavailable,
      disabled,
      required,
      readOnly,
      error,
      variant,
      size,
      open,
      granularity = 'day',
      onChange,
      ...rest
    },
    ref
  ) => {
    const props: RAC.DatePickerProps<DateValue> = {
      isDateUnavailable: dateUnavailable,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      isInvalid: error,
      isOpen: open,
      granularity,
      onChange,
      ...rest,
    };

    const classNames = useClassNames({
      component: 'DatePicker',
      size,
      variant,
    });

    const isSmallScreen = useSmallScreen();

    return (
      <FieldBase
        as={DatePicker}
        variant={variant}
        size={size}
        {...props}
        ref={ref}
      >
        <DatePickerWithPasteWrapper
          onChange={onChange}
          action={
            <IconButton className={classNames}>
              <CalendarIcon size="16" data-testid="action" />
            </IconButton>
          }
        />
        {isSmallScreen ? (
          <Tray>
            <Tray.Title>{rest.label}</Tray.Title>
            <Tray.Content>
              <Calendar disabled={disabled} />
            </Tray.Content>
          </Tray>
        ) : (
          <Popover>
            <Dialog>
              <Calendar disabled={disabled} />
            </Dialog>
          </Popover>
        )}
      </FieldBase>
    );
  }
);

export { _DatePicker as DatePicker };

interface DatePickerWithPasteWrapperProps {
  onChange?: (value: RAC.DateValue | null) => void;
  action?: ReactElement<any>;
}

const DatePickerWithPasteWrapper = ({
  onChange,
  ...props
}: DatePickerWithPasteWrapperProps) => {
  const ctx = useContext(DatePickerStateContext);

  const onPaste = (date: CalendarDate) => {
    if (onChange) {
      onChange(date);
    }
    ctx?.setValue(date);
  };

  return <DateInput onPaste={onPaste} {...props} />;
};
