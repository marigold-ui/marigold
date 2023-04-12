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
import { Headline } from '../Headline';

export interface CalendarProps
  extends Omit<AriaCalendarProps<DateValue>, 'isDisabled' | 'isReadOnly'> {
  disabled?: boolean;
  readOnly?: boolean;
}
export interface CalendarThemeExtension
  extends ThemeExtensionsWithParts<
    'Calendar',
    ['calendarGrid', 'calendarCell', 'calendarHeader']
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
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);
  const styles = useComponentStyles(
    'Calendar',
    {},
    { parts: ['calendarHeader'] }
  );
  return (
    <Box
      __baseCSS={{
        boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
        borderRadius: '16px',
        padding: '16px',
        width: '360px',
      }}
      {...calendarProps}
      ref={ref}
    >
      <Box
        __baseCSS={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '18px',
        }}
      >
        <Box
          __baseCSS={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            width: '100%',
          }}
          css={styles.calendarHeader}
        >
          <Button disabled={disabled} {...prevButtonProps}>
            <ChevronLeft />
          </Button>
          <Headline size="level-3">{title}</Headline>
          <Button disabled={disabled} {...nextButtonProps}>
            <ChevronRight fontSize={'1'} />
          </Button>
        </Box>
      </Box>
      <CalendarGrid state={state} />
    </Box>
  );
};
