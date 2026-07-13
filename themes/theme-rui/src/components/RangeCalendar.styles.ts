import { type ThemeComponent, cva } from '@marigold/system';
import { Calendar, calendarCellBase } from './Calendar.styles';

export const RangeCalendar: ThemeComponent<'RangeCalendar'> = {
  ...Calendar,
  calendarCell: cva({
    base: [
      'h-9 w-full rounded-none',
      // Cells outside the selected range round their hover/focus highlight to
      // match the selected state; in-range cells stay square so the fill connects.
      'not-data-[in-range]:data-hovered:rounded-lg not-data-[in-range]:focus-visible:rounded-lg',
      'data-[in-range]:bg-selected data-[in-range]:text-foreground',
      'selection-start:bg-selected-bold selection-start:text-selected-bold-foreground selection-start:rounded-l-lg',
      'selection-end:bg-selected-bold selection-end:text-selected-bold-foreground selection-end:rounded-r-lg',
      ...calendarCellBase,
      'disabled:data-[in-range]:bg-disabled-surface disabled:data-[in-range]:text-disabled',
      'disabled:selection-start:bg-disabled-surface disabled:selection-start:text-disabled',
      'disabled:selection-end:bg-disabled-surface disabled:selection-end:text-disabled',
    ],
  }),
};
