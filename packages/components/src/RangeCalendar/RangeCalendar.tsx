import { useEffect, useMemo, useRef, useState } from 'react';
import type RAC from 'react-aria-components';
import {
  RangeCalendar as AriaRangeCalendar,
  DateValue,
  FieldErrorContext,
} from 'react-aria-components';
import {
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';
import { CalendarGrid } from '../Calendar/CalendarGrid';
import { CalendarHeader } from '../Calendar/CalendarHeader';
import { CalendarListBox } from '../Calendar/CalendarListBox';
import { CalendarContext } from '../Calendar/Context';
import MonthControls from '../Calendar/MonthControls';
import MonthListBox from '../Calendar/MonthListBox';
import YearListBox from '../Calendar/YearListBox';
import {
  hasOnlyOneSelectableMonth,
  hasOnlyOneSelectableYear,
} from '../Calendar/calendarListBoxSelectableCheck';
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
  visibleDuration?: { months: number };
  /**
   * Controls how the calendar pages when navigating.
   * - 'single': Page by one month at a time
   * - 'visible': Page by the number of visible months
   * @default 'visible'
   */
  pageBehavior?: 'single' | 'visible';
}

type ViewMapKeys = 'month' | 'year';

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
  ...rest
}: RangeCalendarProps<T>) => {
  const visibleMonths = visibleDuration?.months ?? 1;
  const isMultiMonth = visibleMonths > 1;

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

  const [selectedDropdown, setSelectedDropdown] = useState<
    ViewMapKeys | undefined
  >();

  // react-aria's `useRangeCalendar` registers a window-level `pointerup`
  // listener that commits the in-progress range when the click target is not
  // a button. RAC's <ListBoxItem> renders with role="option", so picking a
  // month or year would otherwise trip that commit and drop the user's first
  // click. Stopping native pointerup propagation on the dropdown overlay
  // keeps the event from reaching `window` while still letting the option's
  // own press handler run at the target phase.
  const dropdownOverlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = dropdownOverlayRef.current;
    if (!node) return;
    const stop = (event: PointerEvent) => event.stopPropagation();
    node.addEventListener('pointerup', stop);
    return () => node.removeEventListener('pointerup', stop);
  }, []);

  const ViewMap = {
    month: (
      <MonthListBox
        setSelectedDropdown={setSelectedDropdown}
        minValue={minValue}
        maxValue={maxValue}
      />
    ),
    year: (
      <YearListBox
        setSelectedDropdown={setSelectedDropdown}
        minValue={minValue}
        maxValue={maxValue}
      />
    ),
  } satisfies { [key in ViewMapKeys]: React.JSX.Element };

  const fieldErrorValue = useMemo(
    () =>
      error
        ? {
            isInvalid: true,
            validationErrors: [],
            validationDetails: {} as ValidityState,
          }
        : null,
    [error]
  );

  return (
    <CalendarContext.Provider
      value={{
        classNames,
        visibleMonths,
        minValue,
        maxValue,
        disabled,
      }}
    >
      <FieldErrorContext.Provider value={fieldErrorValue}>
        <FieldBase
          as={AriaRangeCalendar}
          variant={variant}
          size={size}
          description={description}
          errorMessage={errorMessage}
          isInvalid={error}
          isDisabled={disabled}
          className={cn(twWidth[width], classNames.calendar)}
          {...props}
        >
          {isMultiMonth ? (
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
            <div className="relative">
              <div
                ref={dropdownOverlayRef}
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
                <div className="mb-4 flex items-center justify-between">
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
                        hasOnlyOneSelectableYear(minValue, maxValue) ||
                        props.isDisabled
                      }
                      setSelectedDropdown={setSelectedDropdown}
                    />
                  </div>
                  <MonthControls />
                </div>
                <CalendarGrid />
              </div>
            </div>
          )}
        </FieldBase>
      </FieldErrorContext.Provider>
    </CalendarContext.Provider>
  );
};

export { _RangeCalendar as RangeCalendar };
