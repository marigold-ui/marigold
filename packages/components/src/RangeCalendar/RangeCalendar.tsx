import { type ContextType, useCallback, useMemo, useState } from 'react';
import type RAC from 'react-aria-components';
import { FieldErrorContext } from 'react-aria-components/FieldError';
import {
  RangeCalendar as AriaRangeCalendar,
  DateValue,
} from 'react-aria-components/RangeCalendar';
import { WidthProp, cn, createWidthVar, useClassNames } from '@marigold/system';
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
  visibleDuration?: { months: 1 | 2 | 3 };
  /**
   * Controls how the calendar pages when navigating.
   * - 'single': Page by one month at a time
   * - 'visible': Page by the number of visible months
   * @default 'visible'
   */
  pageBehavior?: RAC.RangeCalendarProps<T>['pageBehavior'];
}

type ViewMapKeys = 'month' | 'year';

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
  ...rest
}: RangeCalendarProps<T>) => {
  const visibleMonths = visibleDuration.months;
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

  // react-aria's `useRangeCalendar` commits the range on any window `pointerup`
  // whose target isn't a button, so a tap on the overlay would wrongly commit.
  // We stop those pointerups — but must let `role="option"` taps through, or
  // `usePress`'s touch fallback never fires and month/year selection silently
  // fails on touch (DSTSUP-257). A native listener via callback ref is needed
  // because react-aria also listens natively, before React's capture phase.
  const dropdownOverlayRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const stop = (event: PointerEvent) => {
      if ((event.target as Element)?.closest('[role="option"]')) return;
      event.stopPropagation();
    };
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
              classNames.calendar
            )}
            style={createWidthVar('width', width)}
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
              <>
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
              </>
            )}
          </AriaRangeCalendar>
        </FieldBase>
      </FieldErrorContext>
    </CalendarContext>
  );
};

export { _RangeCalendar as RangeCalendar };
