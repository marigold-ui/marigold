import React, { useRef } from 'react';
import { useCalendarState } from '@react-stately/calendar';
import {
  useCalendar,
  AriaCalendarProps,
  DateValue,
} from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { createCalendar } from '@internationalized/date';
import { Button } from '../Button';
import { CalendarGrid } from './CalendarGrid';
import { ChevronRight, ChevronLeft } from '@marigold/icons';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import MonthDropdown from './MonthDropdown';
import YearDropdown from './YearDropdown';

export interface CalendarProps
  extends Omit<AriaCalendarProps<DateValue>, 'isDisabled' | 'isReadOnly'> {
  disabled?: boolean;
  readOnly?: boolean;
}
export interface CalendarThemeExtension
  extends ThemeExtensionsWithParts<
    'Calendar',
    ['calendar', 'calendarCell', 'calendarHeader']
  > {}

export const Calendar = ({ disabled, readOnly, ...rest }: CalendarProps) => {
  const { locale } = useLocale();
  const props: AriaCalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    ...rest,
  };
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );
  const styles = useComponentStyles(
    'Calendar',
    {},
    { parts: ['calendar', 'calendarHeader'] }
  );
  return (
    <Box
      tabIndex={-1}
      __baseCSS={{
        boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
        borderRadius: '16px',
        padding: '16px',
        width: '360px',
      }}
      {...calendarProps}
      ref={ref}
      css={styles.calendar}
    >
      <Box style={{ display: 'flex', marginBottom: '18px', gap: '60px' }}>
        <Box
          __baseCSS={{
            display: 'flex',
            minWidth: '170px',
            gap: '9px',
            '& button': { borderRadius: '10px', height: '40px' },
          }}
        >
          <YearDropdown state={state} />
          <MonthDropdown state={state} />
        </Box>
        <Box
          __baseCSS={{
            display: 'flex',
            flexWrap: 'nowrap',
            width: '100%',
            justifyContent: 'flex-end',
            gap: '20px',
          }}
          css={styles.calendarHeader}
        >
          <Button disabled={disabled} {...prevButtonProps}>
            <ChevronLeft />
          </Button>
          <Button disabled={disabled} {...nextButtonProps}>
            <ChevronRight fontSize={'1'} />
          </Button>
        </Box>
      </Box>

      <CalendarGrid state={state} />
    </Box>
  );
};
