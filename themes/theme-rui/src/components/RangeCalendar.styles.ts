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
      'data-[in-range]:bg-brand/15 data-[in-range]:text-foreground',
      'selection-start:bg-brand selection-start:text-brand-foreground selection-start:rounded-l-lg',
      'selection-end:bg-brand selection-end:text-brand-foreground selection-end:rounded-r-lg',
      ...calendarCellBase,
    ],
  }),
};
