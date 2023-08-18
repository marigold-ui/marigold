import React, { useRef } from 'react';

import { AriaCalendarCellProps, useCalendarCell } from '@react-aria/calendar';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import { CalendarState } from '@react-stately/calendar';

import { cn, useClassNames, useStateProps } from '@marigold/system';

export interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState;
}
export const CalendarCell = (props: CalendarCellProps) => {
  const ref = useRef(null);
  const { state } = props;
  let { cellProps, buttonProps, formattedDate, isOutsideVisibleRange } =
    useCalendarCell(props, state, ref);
  const classNames = useClassNames({
    component: 'Calendar',
  });
  const isDisabled = cellProps['aria-disabled'] as boolean;
  const { hoverProps, isHovered } = useHover({
    isDisabled: isDisabled || (cellProps['aria-selected'] as boolean),
  });
  const stateProps = useStateProps({
    disabled: isDisabled,
    hover: isHovered,
    selected: cellProps['aria-selected'] as boolean,
  });
  return (
    <td className="group/cell" {...cellProps}>
      <div
        className={cn(
          'flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full p-[5.3px] text-sm font-normal aria-disabled:cursor-default',
          classNames.calendarCell
        )}
        hidden={isOutsideVisibleRange}
        ref={ref}
        {...mergeProps(buttonProps, stateProps, hoverProps)}
      >
        {formattedDate}
      </div>
    </td>
  );
};
