import { Dispatch, SetStateAction, useContext } from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { useCalendarContext } from './Context';
import { useFormattedMonths } from './useFormattedMonths';

interface CalendarButtonListBoxProps {
  type: string;
  isDisabled?: boolean;
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

export const CalendarListBox = ({
  type,
  isDisabled,
  setSelectedDropdown,
}: CalendarButtonListBoxProps) => {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);

  const buttonStyles =
    'flex items-center justify-between gap-1 overflow-hidden';
  const { classNames } = useCalendarContext();

  return (
    <button
      onClick={() => !isDisabled && setSelectedDropdown(type)}
      className={cn(
        buttonStyles,
        classNames.select,
        classNames.calendarListboxButton
      )}
      data-testid={type}
      disabled={isDisabled}
      aria-label={
        type === 'month'
          ? `${months[state.focusedDate.month - 1].substring(0, 3)}${isDisabled ? ' not selectable' : ''}`
          : `${state.focusedDate.year}${isDisabled ? ' not selectable' : ''}`
      }
    >
      {type === 'month'
        ? months[state.focusedDate.month - 1].substring(0, 3)
        : state.focusedDate.year}
      <ChevronsVertical size="16" className="shrink-0" />
    </button>
  );
};
