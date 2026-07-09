import { CalendarDate } from '@internationalized/date';
import type { ReactElement, Ref } from 'react';
import { use } from 'react';
import type RAC from 'react-aria-components';
import {
  DatePicker,
  DatePickerStateContext,
} from 'react-aria-components/DatePicker';
import type { DateValue } from 'react-aria-components/DatePicker';
import { Dialog } from 'react-aria-components/Dialog';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { WidthProp, useClassNames, useSmallScreen } from '@marigold/system';
import { Button } from '../Button/Button';
import { Calendar } from '../Calendar/Calendar';
import type { DatePreset } from '../Calendar/presets';
import { DateInput } from '../DateField/DateInput';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { Popover } from '../Overlay/Popover';
import { Tray } from '../Tray/Tray';
import { Calendar as CalendarIcon } from '../icons/Calendar';
import { intlMessages } from '../intl/messages';

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
   *
   * Numeric/scale values are spacing-scale tokens, not pixels: `width={64}`
   * resolves to `calc(var(--spacing) * 64)` ~= 16rem (256px), not 64px.
   */
  width?: WidthProp['width'];

  /**
   * Quick-select presets rendered beside the calendar in the popover
   * (stacked above the grid in the small-screen tray).
   * Accepts built-in keys (`'today'`, `'yesterday'`, `'tomorrow'`) with
   * localized labels, and custom presets with a `label` and a date value or
   * resolver function. Selecting a preset applies the date; the popover
   * stays open.
   */
  presets?: DatePreset[];
}

const DatePickerBase = ({
  dateUnavailable,
  disabled,
  required,
  readOnly,
  error,
  variant,
  size,
  open,
  granularity = 'day',
  presets,
  onChange,
  ref,
  ...rest
}: DatePickerProps & { ref?: Ref<HTMLDivElement> }) => {
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
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

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
            <Calendar disabled={disabled} presets={presets} />
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">{stringFormatter.format('close')}</Button>
          </Tray.Actions>
        </Tray>
      ) : (
        <Popover matchTriggerWidth={false}>
          <Dialog>
            <Calendar disabled={disabled} presets={presets} />
          </Dialog>
        </Popover>
      )}
    </FieldBase>
  );
};

export { DatePickerBase as DatePicker };

interface DatePickerWithPasteWrapperProps {
  onChange?: (value: RAC.DateValue | null) => void;
  action?: ReactElement<any>;
}

const DatePickerWithPasteWrapper = ({
  onChange,
  ...props
}: DatePickerWithPasteWrapperProps) => {
  const ctx = use(DatePickerStateContext);

  const onPaste = (date: CalendarDate) => {
    if (onChange) {
      onChange(date);
    }
    ctx?.setValue(date);
  };

  return <DateInput onPaste={onPaste} {...props} />;
};
