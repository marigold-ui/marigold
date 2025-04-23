import { Dispatch, Key, SetStateAction, useContext } from 'react';
import {
  CalendarStateContext,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import { Button } from '../Button';
import { useFormattedMonths } from './useFormattedMonths';

interface MonthDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const ButtonComponent = props => {
  const focusManager = useFocusManager();

  let onKeyDown = e => {
    switch (e.key) {
      case 'ArrowRight':
        focusManager?.focusFirst({ wrap: true });
        break;
      case 'ArrowLeft':
        focusManager.focusPrevious({ wrap: true });
        break;
    }
  };

  return (
    <Button {...props} onKeyDown={onKeyDown}>
      {props.children}
    </Button>
  );
};

const MonthListBox = ({ setSelectedDropdown }: MonthDropdownProps) => {
  const state = useContext(CalendarStateContext)!;
  const months = useFormattedMonths(state.timeZone, state.focusedDate);

  let onChange = (index: Key) => {
    let value = Number(index) + 1;
    let date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };

  return (
    <ListBox
      data-testid="monthOptions"
      className="grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 overflow-y-scroll p-2"
    >
      <FocusScope autoFocus restoreFocus contain>
        {months.map((month, index) => {
          return (
            <ListBoxItem className="flex justify-center" key={index}>
              <ButtonComponent
                slot="previous"
                variant={
                  index === state.focusedDate.month - 1 ? 'secondary' : 'text'
                }
                size="small"
                onPress={() => {
                  onChange(index);
                  setSelectedDropdown(undefined);
                }}
                key={index + 1}
              >
                {month.substring(0, 3)}
              </ButtonComponent>
            </ListBoxItem>
          );
        })}
      </FocusScope>
    </ListBox>
  );
};

export default MonthListBox;
