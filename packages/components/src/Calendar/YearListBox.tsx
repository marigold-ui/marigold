import { CalendarDate } from '@internationalized/date';
import {
  Dispatch,
  Key,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Button, CalendarStateContext } from 'react-aria-components';
import { DateValue } from 'react-aria-components';
import { useDateFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { useCalendarContext } from './Context';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
  minValue?: DateValue;
  maxValue?: DateValue;
}

const YearListBox = ({
  setSelectedDropdown,
  minValue,
  maxValue,
}: YearDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
  const { classNames } = useCalendarContext();
  const years: { value: CalendarDate; formatted: string }[] = [];
  let formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  });
  for (let i = -20; i <= 20; i++) {
    let date = state.focusedDate.add({ years: i });
    years.push({
      value: date,
      formatted: formatter.format(date.toDate(state.timeZone)),
    });
  }

  const minYear = minValue ? minValue.year : -Infinity;
  const maxYear = maxValue ? maxValue.year : Infinity;

  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeButtonRef.current) {
      const activeButton = activeButtonRef.current;
      activeButton?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
  }, [state.focusedDate]);

  const onChange = (index: number, isDisabled: boolean) => {
    if (isDisabled) return;
    const date = years[index].value;
    state.setFocusedDate(date);
    setSelectedDropdown(undefined);
  };

  return (
    <ul
      data-testid="yearOptions"
      className="grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 overflow-y-scroll p-2"
    >
      {years.map((year, index) => {
        const yearNum = year.value.year;
        const isDisabled = yearNum < minYear || yearNum > maxYear;
        const isSelected = yearNum === state.focusedDate.year;

        return (
          <li className="flex justify-center" key={index}>
            <div
              ref={isSelected ? activeButtonRef : (null as any)}
              className="flex size-full justify-center"
            >
              <Button
                slot="previous"
                className={cn(
                  classNames.calendarListboxButton,
                  'inline-flex items-center justify-center gap-[0.5ch]',
                  isDisabled && 'cursor-not-allowed opacity-50'
                )}
                onPress={() => {
                  onChange(index, isDisabled);
                }}
                isDisabled={isDisabled}
                key={index}
                data-value={year.formatted}
                aria-current={isSelected}
              >
                {year.formatted}
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default YearListBox;
