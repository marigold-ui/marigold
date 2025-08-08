import React, { Dispatch, SetStateAction, useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { DateValue } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ChevronDown } from '../icons';
import { useCalendarContext } from './Context';
import { useFormattedMonths } from './useFormattedMonths';

interface CalendarButtonListBoxProps {
  type: string;
  isDisabled?: boolean;
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

export function CalendarListBox({
  type,
  isDisabled,
  setSelectedDropdown,
}: CalendarButtonListBoxProps) {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);

  const buttonStyles =
    'flex items-center justify-between gap-1 overflow-hidden';
  const { classNames } = useCalendarContext();

  return (
    <button
      disabled={isDisabled}
      onClick={() => setSelectedDropdown(type)}
      className={cn(buttonStyles, classNames.select)}
      data-testid={type}
    >
      {type === 'month'
        ? months[state.focusedDate.month - 1].substring(0, 3)
        : state.focusedDate.year}
      <ChevronDown />
    </button>
  );
}
