import React, { useState } from 'react';
import type RAC from 'react-aria-components';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
} from 'react-aria-components';

import { DateValue } from '@react-aria/calendar';

import { ChevronLeft, ChevronRight } from '@marigold/icons';
import { WidthProp, cn, useClassNames } from '@marigold/system';

import { CalendarButtonListBox } from './CalendarButtonListBox';
import MonthDropdown from './MonthDropdown';
import YearDropdown from './YearDropdown';
import { CalendarGridHeader } from './_CalendarGridHeader';

// Props
// ---------------
type RemovedProps = 'isDisabled' | 'isReadOnly' | 'isInvalid';
export interface CalendarProps
  extends Omit<RAC.CalendarProps<DateValue>, RemovedProps> {
  disabled?: boolean;
  readOnly?: boolean;
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  error?: boolean;
  errorMessage?: string;
}

type ViewMapKeys = 'month' | 'year';
// Component
// ---------------
export const _Calendar = ({
  disabled,
  readOnly,
  error,
  size,
  variant,
  ...rest
}: CalendarProps) => {
  const props: RAC.CalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isInvalid: error,
    ...rest,
  };

  const classNames = useClassNames({ component: 'Calendar' });
  const buttonClassNames = useClassNames({ component: 'Button' });

  const [selectedDropdown, setSelectedDropdown] = useState<
    ViewMapKeys | undefined
  >();

  const ViewMap = {
    month: <MonthDropdown setSelectedDropdown={setSelectedDropdown} />,
    year: <YearDropdown setSelectedDropdown={setSelectedDropdown} />,
  } satisfies { [key in ViewMapKeys]: React.JSX.Element };

  return (
    <Calendar
      className={cn(
        'flex min-h-[350px] w-[360px] flex-col rounded-sm p-4  shadow-[0_4px_4px_rgba(165,165,165,0.25)]',
        classNames.calendar
      )}
      {...props}
    >
      {selectedDropdown ? (
        ViewMap[selectedDropdown]
      ) : (
        <>
          <header className="mb-4 flex items-center justify-between">
            <div className="flex w-full gap-4">
              <CalendarButtonListBox
                type="month"
                isDisabled={props.isDisabled}
                setSelectedDropdown={setSelectedDropdown}
              />
              <CalendarButtonListBox
                type="year"
                isDisabled={props.isDisabled}
                setSelectedDropdown={setSelectedDropdown}
              />
            </div>
            <div
              className={cn(
                'flex w-full flex-nowrap justify-end gap-[10px] [&_button:disabled]:cursor-not-allowed [&_button]:px-2 [&_button]:py-1',
                classNames.calendarControllers
              )}
            >
              <Button
                className={cn(
                  'inline-flex items-center justify-center gap-[0.5ch]',
                  buttonClassNames
                )}
                slot="previous"
              >
                <ChevronLeft />
              </Button>
              <Button
                className={cn(
                  'inline-flex items-center justify-center gap-[0.5ch]',
                  buttonClassNames
                )}
                slot="next"
              >
                <ChevronRight />
              </Button>
            </div>
          </header>
          <CalendarGrid>
            <CalendarGridHeader />
            <CalendarGridBody>
              {date => (
                <CalendarCell
                  date={date}
                  className={cn(
                    'flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full p-[5.3px] text-sm font-normal aria-disabled:cursor-default',
                    classNames.calendarCell
                  )}
                />
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </>
      )}
    </Calendar>
  );
};

export { _Calendar as Calendar };
