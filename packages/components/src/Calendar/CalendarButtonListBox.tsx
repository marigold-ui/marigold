import React, { Dispatch, SetStateAction, useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';

import { ChevronDown } from '@marigold/icons';
import { cn, useClassNames } from '@marigold/system';

import { useFormattedMonths } from './useFormattedMonths';

interface CalendarButtonListBoxProps {
  type: string;
  isDisabled?: boolean;
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

export function CalendarButtonListBox({
  type,
  isDisabled,
  setSelectedDropdown,
}: CalendarButtonListBoxProps) {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);

  const buttonStyles =
    'flex items-center justify-between gap-1 overflow-hidden';
  const { select: selectClassNames } = useClassNames({ component: 'Select' });

  return (
    <button
      disabled={isDisabled}
      onClick={() => setSelectedDropdown(type)}
      className={cn(buttonStyles, selectClassNames)}
      data-testid={type}
    >
      {type === 'month'
        ? months[state.focusedDate.month - 1].substring(0, 3)
        : state.focusedDate.year}
      <ChevronDown />
    </button>
  );
}
