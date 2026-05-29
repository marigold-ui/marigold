import { Dispatch, SetStateAction } from 'react';
import { CalendarYearPicker } from 'react-aria-components';
import { ListBox } from './ListBox';

interface YearDropdownProps {
  setSelectedDropdown: Dispatch<SetStateAction<string | undefined>>;
}

const YearListBox = ({ setSelectedDropdown }: YearDropdownProps) => (
  // `visibleYears={41}` preserves the previous unbounded behavior (focused
  // year ±20). When `minValue`/`maxValue` are set on the calendar, the picker
  // reads them from state and only emits in-range years, so no out-of-range
  // years are rendered.
  <CalendarYearPicker visibleYears={41}>
    {({ items, value, onChange }) => (
      <ListBox
        dataTestid="yearOptions"
        items={items}
        isDisabled={() => false}
        isSelected={item => item.id === value}
        onSelect={item => {
          onChange(item.id);
          setSelectedDropdown(undefined);
        }}
        format={item => item.formatted}
      />
    )}
  </CalendarYearPicker>
);

export default YearListBox;
