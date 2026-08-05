import { use, useState } from 'react';
import type RAC from 'react-aria-components';
import { Calendar, DateValue } from 'react-aria-components/Calendar';
import { DatePickerStateContext } from 'react-aria-components/DatePicker';
import { WidthProp, cn, createWidthVar, useClassNames } from '@marigold/system';
import { CalendarBody } from './CalendarBody';
import { CalendarPresets, CalendarPresetsShell } from './CalendarPresets';
import { CalendarContext, type CalendarDropdownView } from './Context';
import type { DatePreset } from './presets';

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

export interface CalendarProps extends Omit<
  RAC.CalendarProps<DateValue>,
  RemovedProps
> {
  /**
   * Disables the Calendar.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the calendar value is immutable.
   * @default false
   */
  readOnly?: boolean;
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
  dateUnavailable?: RAC.CalendarProps<DateValue>['isDateUnavailable'];
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
  pageBehavior?: RAC.CalendarProps<DateValue>['pageBehavior'];
  /**
   * Quick-select presets rendered as a rail beside the calendar. On small
   * screens the grid renders first, topped by a "Quick selection" row that
   * opens the preset list — in a tray for inline calendars; inside a
   * picker's tray the sheet switches to the list in place. Accepts built-in
   * keys (see `BuiltInDatePresetKey`) with localized labels, and custom
   * presets with a `label` and a date value or resolver function. Selecting
   * a preset sets the date; the preset matching the current selection shows
   * as selected. Presets that fall outside `minValue`/`maxValue` or are
   * unavailable are disabled.
   */
  presets?: readonly DatePreset[];
}

// Component
// ---------------
const _Calendar = ({
  disabled,
  readOnly,
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
}: CalendarProps) => {
  const visibleMonths = visibleDuration?.months ?? 1;
  const hasPresets = !!presets?.length;

  const props: RAC.CalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isDateUnavailable: dateUnavailable,
    minValue,
    maxValue,
    visibleDuration,
    pageBehavior,
    ...rest,
  };

  const classNames = useClassNames({ component: 'Calendar', size, variant });

  // Lives here, not in <CalendarBody>: a picker's preset view switch unmounts
  // the body, and an open dropdown has to survive that.
  const [selectedDropdown, setSelectedDropdown] = useState<
    CalendarDropdownView | undefined
  >();

  const pickerState = use(DatePickerStateContext);
  const isInPicker = pickerState != null;
  const [pickerView, setPickerView] = useState<'calendar' | 'presets'>(
    'calendar'
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
        isRange: false,
      }}
    >
      <Calendar
        className={cn(
          'relative flex w-(--width) flex-col',
          // gap-3 below `sm`: with gap-4 a 5-week month overflows the picker
          // tray's content area by 3px at 320x568, drawing a needless scrollbar.
          hasPresets && 'gap-4 max-sm:flex-col max-sm:gap-3 sm:flex-row',
          isInPicker && pickerView === 'presets' && 'max-sm:w-full',
          classNames.calendar
        )}
        style={createWidthVar('width', width)}
        {...props}
      >
        {hasPresets ? (
          <CalendarPresetsShell
            isInPicker={isInPicker}
            pickerView={pickerView}
            onPickerViewChange={setPickerView}
            renderPresets={presetProps => (
              <CalendarPresets presets={presets} {...presetProps} />
            )}
          >
            {body}
          </CalendarPresetsShell>
        ) : (
          body
        )}
      </Calendar>
    </CalendarContext>
  );
};

export { _Calendar as Calendar };
