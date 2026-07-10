import { use, useState } from 'react';
import type RAC from 'react-aria-components';
import { Calendar, DateValue } from 'react-aria-components/Calendar';
import { DatePickerStateContext } from 'react-aria-components/DatePicker';
import { WidthProp, cn, createWidthVar, useClassNames } from '@marigold/system';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
import { CalendarListBox } from './CalendarListBox';
import { CalendarPresets, CalendarPresetsShell } from './CalendarPresets';
import { CalendarContext } from './Context';
import MonthControls from './MonthControls';
import MonthListBox from './MonthListBox';
import YearListBox from './YearListBox';
import {
  hasOnlyOneSelectableMonth,
  hasOnlyOneSelectableYear,
} from './calendarListBoxSelectableCheck';
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
  presets?: DatePreset[];
}

type ViewMapKeys = 'month' | 'year';

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
  const isMultiMonth = visibleMonths > 1;
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

  const [selectedDropdown, setSelectedDropdown] = useState<
    ViewMapKeys | undefined
  >();

  // Non-null exactly when this calendar is the one embedded in a
  // `<DatePicker>`. Its tray already IS a bottom sheet, so "Quick selection"
  // switches the tray content in place; standalone, it opens a tray of its
  // own.
  const pickerState = use(DatePickerStateContext);
  const isInPicker = pickerState != null;
  const [pickerView, setPickerView] = useState<'calendar' | 'presets'>(
    'calendar'
  );

  const ViewMap = {
    month: <MonthListBox setSelectedDropdown={setSelectedDropdown} />,
    year: <YearListBox setSelectedDropdown={setSelectedDropdown} />,
  } satisfies { [key in ViewMapKeys]: React.JSX.Element };

  const content = isMultiMonth ? (
    <div className={classNames.calendarContainer}>
      {[...Array(visibleMonths).keys()].map(i => (
        <div key={i} className={classNames.calendarMonth}>
          <CalendarHeader
            monthOffset={i}
            showPrevious={i === 0}
            showNext={i === visibleMonths - 1}
          />
          <CalendarGrid offset={{ months: i }} />
        </div>
      ))}
    </div>
  ) : (
    <>
      <div
        className={cn(
          'pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0',
          selectedDropdown && 'pointer-events-auto opacity-100'
        )}
      >
        {ViewMap[selectedDropdown as ViewMapKeys]}
      </div>

      <div
        className={cn(
          'flex flex-col',
          selectedDropdown && 'pointer-events-none opacity-0'
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex w-fit gap-4">
            <CalendarListBox
              key="month"
              type="month"
              isDisabled={
                hasOnlyOneSelectableMonth(minValue, maxValue) ||
                props.isDisabled
              }
              setSelectedDropdown={setSelectedDropdown}
            />
            <CalendarListBox
              key="year"
              type="year"
              isDisabled={
                hasOnlyOneSelectableYear(minValue, maxValue) || props.isDisabled
              }
              setSelectedDropdown={setSelectedDropdown}
            />
          </div>
          <MonthControls />
        </div>
        <CalendarGrid />
      </div>
    </>
  );

  return (
    <CalendarContext
      value={{
        classNames,
        visibleMonths,
        minValue,
        maxValue,
        disabled,
      }}
    >
      <Calendar
        className={cn(
          'relative flex w-(--width) flex-col',
          hasPresets && 'gap-4 max-sm:flex-col sm:flex-row',
          // The preset list view must span the picker tray like the inline
          // preset sheet does; the calendar's usual fit-content width would
          // squish the rows to their natural width.
          isInPicker && pickerView === 'presets' && 'max-sm:w-full',
          classNames.calendar
        )}
        style={createWidthVar('width', width)}
        {...props}
      >
        {presets?.length ? (
          <CalendarPresetsShell
            isInPicker={isInPicker}
            pickerView={pickerView}
            onPickerViewChange={setPickerView}
            renderPresets={presetProps => (
              <CalendarPresets presets={presets} {...presetProps} />
            )}
          >
            {content}
          </CalendarPresetsShell>
        ) : (
          content
        )}
      </Calendar>
    </CalendarContext>
  );
};

export { _Calendar as Calendar };
