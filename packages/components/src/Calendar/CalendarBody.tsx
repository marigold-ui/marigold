import { type Dispatch, type SetStateAction, useCallback } from 'react';
import { cn } from '@marigold/system';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
import { CalendarListBox } from './CalendarListBox';
import { type CalendarDropdownView, useCalendarContext } from './Context';
import MonthControls from './MonthControls';
import MonthListBox from './MonthListBox';
import YearListBox from './YearListBox';
import {
  hasOnlyOneSelectableMonth,
  hasOnlyOneSelectableYear,
} from './calendarListBoxSelectableCheck';

// Props
// ---------------
interface CalendarBodyProps {
  /**
   * Which month/year dropdown is open, if any. Owned by the calendar so it
   * outlives a preset view switch, which unmounts this component.
   */
  selectedDropdown?: CalendarDropdownView;
  setSelectedDropdown: Dispatch<
    SetStateAction<CalendarDropdownView | undefined>
  >;
}

// Component
// ---------------
/**
 * Grid layout shared by `Calendar` and `RangeCalendar`. Renders unwrapped, so
 * the dropdown overlay keeps positioning against the calendar root.
 */
export const CalendarBody = ({
  selectedDropdown,
  setSelectedDropdown,
}: CalendarBodyProps) => {
  const { classNames, visibleMonths, minValue, maxValue, disabled, isRange } =
    useCalendarContext();

  // Range only: `useRangeCalendar` commits an in-progress range on any window
  // `pointerup` outside a button. `usePress` listens on `document`, that commit on
  // `window`, so stopping overlay pointerups at `document` (not the node, not
  // `window`) keeps press handling alive and never reaches the commit (DSTSUP-257).
  // Native listener because react-aria's is native too.
  const dropdownOverlayRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !isRange) return;
      const ownerDocument = node.ownerDocument;
      const stop = (event: PointerEvent) => {
        if (node.contains(event.target as Node | null)) event.stopPropagation();
      };
      ownerDocument.addEventListener('pointerup', stop);
      return () => ownerDocument.removeEventListener('pointerup', stop);
    },
    [isRange]
  );

  if (visibleMonths > 1) {
    return (
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
    );
  }

  return (
    <>
      <div
        ref={dropdownOverlayRef}
        className={cn(
          'pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0',
          selectedDropdown && 'pointer-events-auto opacity-100'
        )}
      >
        {selectedDropdown === 'month' && (
          <MonthListBox setSelectedDropdown={setSelectedDropdown} />
        )}
        {selectedDropdown === 'year' && (
          <YearListBox setSelectedDropdown={setSelectedDropdown} />
        )}
      </div>

      <div
        className={cn(
          'flex flex-col',
          selectedDropdown && 'pointer-events-none opacity-0'
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-4 max-sm:gap-2">
          <div className="flex w-fit gap-4 max-sm:gap-3">
            <CalendarListBox
              key="month"
              type="month"
              isDisabled={
                hasOnlyOneSelectableMonth(minValue, maxValue) || disabled
              }
              setSelectedDropdown={setSelectedDropdown}
            />
            <CalendarListBox
              key="year"
              type="year"
              isDisabled={
                hasOnlyOneSelectableYear(minValue, maxValue) || disabled
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
};
