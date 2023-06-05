import React, { useRef } from 'react';
import { AriaCalendarCellProps, useCalendarCell } from '@react-aria/calendar';
import { mergeProps } from '@react-aria/utils';
import { CalendarState } from '@react-stately/calendar';
import { Box, useComponentStyles, useStateProps } from '@marigold/system';
import { useHover } from '@react-aria/interactions';

export interface CalendarCellProps extends AriaCalendarCellProps {
  state: CalendarState;
}
export const CalendarCell = (props: CalendarCellProps) => {
  const ref = useRef(null);
  const { state } = props;
  let { cellProps, buttonProps, formattedDate, isOutsideVisibleRange } =
    useCalendarCell(props, state, ref);
  const styles = useComponentStyles(
    'Calendar',
    {},
    { parts: ['calendarCell'] }
  );
  const isDisabled = cellProps['aria-disabled'] as boolean;
  const { hoverProps, isHovered } = useHover({
    isDisabled,
  });
  const stateProps = useStateProps({
    disabled: isDisabled,
    hover: isHovered,
    selected: cellProps['aria-selected'] as boolean,
  });
  return (
    <Box as="td" {...cellProps}>
      <Box
        __baseCSS={{
          fontSize: '0.875rem',
          fontWeight: '400',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '30px',
          height: '30px',
          padding: '0.3rem',
          borderRadius: '50%',
        }}
        css={styles.calendarCell}
        hidden={isOutsideVisibleRange}
        ref={ref}
        {...mergeProps(buttonProps, stateProps, hoverProps)}
      >
        {formattedDate}
      </Box>
    </Box>
  );
};
