import { CalendarDate } from '@internationalized/date';
import {
  Dispatch,
  Key,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { CalendarStateContext } from 'react-aria-components';
import { useDateFormatter } from '@react-aria/i18n';
import { Button } from '../Button';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const YearListBox = ({ setSelectedDropdown }: YearDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
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

  let onChange = (key: Key) => {
    let index = Number(key);
    let date = years[index].value;
    state.setFocusedDate(date);
  };

  return (
    <ul
      data-testid="yearOptions"
      className="grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 overflow-y-scroll p-2"
    >
      {years.map((year, index) => {
        const isActive = +year.formatted === state.focusedDate.year;

        return (
          <li className="flex justify-center" key={index}>
            <div
              ref={isActive ? activeButtonRef : (null as any)}
              style={{ height: '100%', width: '100%' }}
            >
              <Button
                slot="previous"
                disabled={state.isDisabled}
                variant={isActive ? 'secondary' : 'text'}
                size="small"
                onPress={() => {
                  onChange(index);
                  setSelectedDropdown(undefined);
                }}
                key={index}
                data-value={year.formatted}
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
