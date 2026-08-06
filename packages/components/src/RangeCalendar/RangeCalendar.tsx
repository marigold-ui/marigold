import { type ContextType, use, useMemo, useState } from 'react';
import type RAC from 'react-aria-components';
import { DateRangePickerStateContext } from 'react-aria-components/DateRangePicker';
import { FieldErrorContext } from 'react-aria-components/FieldError';
import {
  RangeCalendar as AriaRangeCalendar,
  DateValue,
} from 'react-aria-components/RangeCalendar';
import { WidthProp, cn, createWidthVar, useClassNames } from '@marigold/system';
import { CalendarBody } from '../Calendar/CalendarBody';
import {
  CalendarPresetsShell,
  RangeCalendarPresets,
} from '../Calendar/CalendarPresets';
import {
  CalendarContext,
  type CalendarDropdownView,
} from '../Calendar/Context';
import type { DateRangePreset } from '../Calendar/presets';
import { FieldBase, type FieldBaseProps } from '../FieldBase/FieldBase';

// Props
// ---------------
type RemovedProps =
  | 'isDateUnavailable'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isInvalid'
  | 'errorMessage'
  | 'className'
  | 'style';

export interface RangeCalendarProps<T extends DateValue = DateValue>
  extends
    Omit<RAC.RangeCalendarProps<T>, RemovedProps>,
    Pick<FieldBaseProps<'div'>, 'description' | 'errorMessage'> {
  /**
   * Disables the RangeCalendar.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the calendar value is immutable.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether the value is invalid.
   * @default false
   */
  error?: boolean;
  /**
   * Whether non-contiguous ranges are allowed.
   * @default false
   */
  allowsNonContiguousRanges?: boolean;
  variant?: string;
  size?: string;
  /**
   * Sets the width of the calendar. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default fit
   */
  width?: WidthProp['width'];
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
   */
  dateUnavailable?: RAC.RangeCalendarProps<T>['isDateUnavailable'];
  /**
   * The number of months to display at once. Up to 3 months are supported.
   * @default { months: 1 }
   */
  visibleDuration?: { months: 1 | 2 | 3 };
  /**
   * Controls how the calendar pages when navigating.
   * - 'single': Page by one month at a time
   * - 'visible': Page by the number of visible months
   * @default 'visible'
   */
  pageBehavior?: RAC.RangeCalendarProps<T>['pageBehavior'];
  /**
   * Quick-select presets rendered as a rail beside the calendar. On small
   * screens the grid renders first, topped by a "Quick selection" row that
   * opens the preset list — in a tray for inline calendars; inside a
   * picker's tray the sheet switches to the list in place. Accepts built-in
   * keys (see `BuiltInDateRangePresetKey`) with localized labels, and custom
   * presets with a `label` and a range value or resolver function. Selecting
   * a preset sets the range; the preset matching the current selection shows
   * as selected. Presets that fall outside `minValue`/`maxValue` or hit
   * unavailable dates are disabled.
   */
  presets?: readonly DateRangePreset[];
}

const EMPTY_VALIDITY_STATE: ValidityState = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: false,
  valueMissing: false,
};

// Component
// ---------------
const _RangeCalendar = <T extends DateValue>({
  disabled,
  readOnly,
  error,
  allowsNonContiguousRanges,
  errorMessage,
  description,
  size,
  variant,
  width = 'fit',
  dateUnavailable,
  minValue,
  maxValue,
  visibleDuration = { months: 1 },
  pageBehavior = 'visible',
  presets,
  ...rest
}: RangeCalendarProps<T>) => {
  const visibleMonths = visibleDuration.months;
  const hasPresets = !!presets?.length;

  const props: RAC.RangeCalendarProps<T> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isInvalid: error,
    isDateUnavailable: dateUnavailable,
    allowsNonContiguousRanges,
    minValue,
    maxValue,
    visibleDuration,
    pageBehavior,
    ...rest,
  };

  const classNames = useClassNames({
    component: 'RangeCalendar',
    size,
    variant,
  });

  // Lives here, not in <CalendarBody>: a picker's preset view switch unmounts
  // the body, and an open dropdown has to survive that.
  const [selectedDropdown, setSelectedDropdown] = useState<
    CalendarDropdownView | undefined
  >();

  // Non-null exactly when this calendar is the one embedded in a
  // `<DateRangePicker>`. Its tray already IS a bottom sheet, so "Quick
  // selection" switches the tray content in place; standalone, it opens a
  // tray of its own.
  const pickerState = use(DateRangePickerStateContext);
  const isInPicker = pickerState != null;
  const [pickerView, setPickerView] = useState<'calendar' | 'presets'>(
    'calendar'
  );

  const fieldErrorValue = useMemo<ContextType<typeof FieldErrorContext>>(
    () =>
      error
        ? {
            isInvalid: true,
            validationErrors: [],
            validationDetails: EMPTY_VALIDITY_STATE,
          }
        : null,
    [error]
  );

  const body = (
    <CalendarBody
      selectedDropdown={selectedDropdown}
      setSelectedDropdown={setSelectedDropdown}
    />
  );

  return (
    <CalendarContext
      value={{
        classNames,
        visibleMonths,
        minValue,
        maxValue,
        disabled,
        isRange: true,
      }}
    >
      <FieldErrorContext value={fieldErrorValue}>
        <FieldBase
          variant={variant}
          size={size}
          description={description}
          errorMessage={errorMessage}
          isInvalid={error}
          isDisabled={disabled}
        >
          {/*
           * RAC's <RangeCalendar> only registers an `errorMessage` slot, so
           * rendering <FieldBase> as the calendar element would make
           * <Text slot="description"> from <HelpText> throw "Invalid slot".
           * Wrapping AriaRangeCalendar as a child keeps the description
           * outside the calendar's slot context.
           */}
          <AriaRangeCalendar
            {...props}
            className={cn(
              'relative flex w-(--width) flex-col',
              // gap-3 below `sm`: with gap-4 a 5-week month overflows the
              // picker tray's content area at 320x568, drawing a needless
              // scrollbar.
              hasPresets && 'gap-4 max-sm:flex-col max-sm:gap-3 sm:flex-row',
              // The preset list view must span the picker tray like the
              // inline preset sheet does; the calendar's usual fit-content
              // width would squish the rows to their natural width.
              isInPicker && pickerView === 'presets' && 'max-sm:w-full',
              classNames.calendar
            )}
            style={createWidthVar('width', width)}
          >
            {hasPresets ? (
              <CalendarPresetsShell
                isInPicker={isInPicker}
                pickerView={pickerView}
                onPickerViewChange={setPickerView}
                renderPresets={presetProps => (
                  <RangeCalendarPresets presets={presets} {...presetProps} />
                )}
              >
                {body}
              </CalendarPresetsShell>
            ) : (
              body
            )}
          </AriaRangeCalendar>
        </FieldBase>
      </FieldErrorContext>
    </CalendarContext>
  );
};

export { _RangeCalendar as RangeCalendar };
