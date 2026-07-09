import { type ContextType, useCallback, useMemo, useState } from 'react';
import type RAC from 'react-aria-components';
import { FieldErrorContext } from 'react-aria-components/FieldError';
import {
  RangeCalendar as AriaRangeCalendar,
  DateValue,
} from 'react-aria-components/RangeCalendar';
import {
  WidthProp,
  cn,
  createWidthVar,
  useClassNames,
  useSmallScreen,
} from '@marigold/system';
import { CalendarGrid } from '../Calendar/CalendarGrid';
import { CalendarHeader } from '../Calendar/CalendarHeader';
import { CalendarListBox } from '../Calendar/CalendarListBox';
import {
  PresetsNavButton,
  RangeCalendarPresets,
} from '../Calendar/CalendarPresets';
import { CalendarContext } from '../Calendar/Context';
import MonthControls from '../Calendar/MonthControls';
import MonthListBox from '../Calendar/MonthListBox';
import YearListBox from '../Calendar/YearListBox';
import {
  hasOnlyOneSelectableMonth,
  hasOnlyOneSelectableYear,
} from '../Calendar/calendarListBoxSelectableCheck';
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
   * Quick-select presets rendered beside the calendar (stacked above the
   * grid on small screens). Accepts built-in
   * keys (`'last-7-days'`, `'last-30-days'`, `'this-month'`) with localized
   * labels, and custom presets with a `label` and a range value or resolver
   * function. Selecting a preset sets the range; the preset matching the
   * current selection is highlighted. Presets that fall outside
   * `minValue`/`maxValue` or hit unavailable dates are disabled.
   */
  presets?: DateRangePreset[];
  /**
   * Whether the quick-select preset list is shown before the calendar grid
   * on small screens. Has no effect on larger screens, where presets render
   * as a rail beside the grid.
   * @default false
   */
  defaultPresetsOpen?: boolean;
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
  presets,
  defaultPresetsOpen = false,
  ...rest
}: RangeCalendarProps<T>) => {
  const visibleMonths = visibleDuration.months;
  const isMultiMonth = visibleMonths > 1;
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

  const [selectedDropdown, setSelectedDropdown] = useState<
    ViewMapKeys | undefined
  >();

  const isSmallScreen = useSmallScreen();
  const [smallScreenView, setSmallScreenView] = useState<
    'presets' | 'calendar'
  >(defaultPresetsOpen ? 'presets' : 'calendar');
  // Focus the nav row only when the view switch came from in-component
  // navigation, never on initial mount.
  const [hasNavigated, setHasNavigated] = useState(false);

  // react-aria's `useRangeCalendar` commits an in-progress range on any window
  // `pointerup` that isn't on a button (our role="option" items included). The key
  // detail: `usePress` listens for the touch press-end on `document`, while the
  // range-commit listens on `window`. We stop overlay pointerups at `document` (not
  // the node, not `window`) so both `usePress` and our guard still fire, but the
  // `window` range-commit never does — which is exactly what keeps touch selection
  // working (DSTSUP-257). Native listener because react-aria also listens natively,
  // outside React's events.
  const dropdownOverlayRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const ownerDocument = node.ownerDocument;
    const stop = (event: PointerEvent) => {
      if (node.contains(event.target as Node | null)) event.stopPropagation();
    };
    ownerDocument.addEventListener('pointerup', stop);
    return () => ownerDocument.removeEventListener('pointerup', stop);
  }, []);

  const ViewMap = {
    month: <MonthListBox setSelectedDropdown={setSelectedDropdown} />,
    year: <YearListBox setSelectedDropdown={setSelectedDropdown} />,
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
        readOnly,
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
              hasPresets && 'gap-4 max-sm:flex-col sm:flex-row',
              classNames.calendar
            )}
            style={createWidthVar('width', width)}
          >
            {presets?.length ? (
              isSmallScreen ? (
                smallScreenView === 'presets' ? (
                  <RangeCalendarPresets
                    presets={presets}
                    autoFocus={hasNavigated}
                    onCustom={() => {
                      setSmallScreenView('calendar');
                      setHasNavigated(true);
                    }}
                  />
                ) : (
                  <>
                    <PresetsNavButton
                      variant={defaultPresetsOpen ? 'back' : 'open'}
                      autoFocus={hasNavigated}
                      onPress={() => {
                        setSmallScreenView('presets');
                        setHasNavigated(true);
                      }}
                    />
                    <div className="relative flex min-w-0 flex-col">
                      {content}
                    </div>
                  </>
                )
              ) : (
                <>
                  <RangeCalendarPresets presets={presets} />
                  <div className="relative flex min-w-0 flex-col">
                    {content}
                  </div>
                </>
              )
            ) : (
              content
            )}
          </AriaRangeCalendar>
        </FieldBase>
      </FieldErrorContext>
    </CalendarContext>
  );
};

export { _RangeCalendar as RangeCalendar };
