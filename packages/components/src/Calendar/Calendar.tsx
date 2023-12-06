import React, { useState } from 'react';
import type RAC from 'react-aria-components';
import { Calendar } from 'react-aria-components';

import { DateValue } from '@react-aria/calendar';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { CalendarGrid } from './CalendarGrid';
import { DataListBox } from './DataListBox';
import MonthControls from './MonthControls';
import MonthListBox from './MonthListBox';
import YearListBox from './YearListBox';

// Props
// ---------------
type RemovedProps = 'isDisabled' | 'isReadOnly' | 'isInvalid' | 'errorMessage';
export interface CalendarProps
  extends Omit<RAC.CalendarProps<DateValue>, RemovedProps> {
  disabled?: boolean;
  readOnly?: boolean;
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
}

type ViewMapKeys = 'month' | 'year';
// Component
// ---------------
export const _Calendar = ({
  disabled,
  readOnly,
  size,
  variant,
  ...rest
}: CalendarProps) => {
  const props: RAC.CalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    ...rest,
  };

  const classNames = useClassNames({ component: 'Calendar' });

  const [selectedDropdown, setSelectedDropdown] = useState<
    ViewMapKeys | undefined
  >();

  const ViewMap = {
    month: <MonthListBox setSelectedDropdown={setSelectedDropdown} />,
    year: <YearListBox setSelectedDropdown={setSelectedDropdown} />,
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
          <div className="mb-4 flex items-center justify-between">
            <div className="flex w-full gap-4">
              <DataListBox
                type="month"
                isDisabled={props.isDisabled}
                setSelectedDropdown={setSelectedDropdown}
              />
              <DataListBox
                type="year"
                isDisabled={props.isDisabled}
                setSelectedDropdown={setSelectedDropdown}
              />
            </div>
            <MonthControls />
          </div>
          <CalendarGrid />
        </>
      )}
    </Calendar>
  );
};

export { _Calendar as Calendar };
