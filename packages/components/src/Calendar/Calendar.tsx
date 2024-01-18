import React, { useState } from 'react';
import type RAC from 'react-aria-components';
import { Calendar, DateValue } from 'react-aria-components';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { CalendarGrid } from './CalendarGrid';
import { CalendarListBox } from './CalendarListBox';
import MonthControls from './MonthControls';
import MonthListBox from './MonthListBox';
import YearListBox from './YearListBox';

// Props
// ---------------
type RemovedProps =
  | 'isDisabled'
  | 'isReadOnly'
  | 'isInvalid'
  | 'errorMessage'
  | 'className'
  | 'style';

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
        'flex min-h-[350px] w-[360px] flex-col rounded-sm p-4',
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
              <CalendarListBox
                type="month"
                isDisabled={props.isDisabled}
                setSelectedDropdown={setSelectedDropdown}
              />
              <CalendarListBox
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
