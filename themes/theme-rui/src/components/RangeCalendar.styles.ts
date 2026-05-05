import { type ThemeComponent, cva } from '@marigold/system';
import { Calendar, calendarCellBase } from './Calendar.styles';

export const RangeCalendar: ThemeComponent<'RangeCalendar'> = {
  ...Calendar,
  calendarCell: cva({
    base: [
      'h-9 w-full rounded-none',
      'data-[in-range]:bg-brand/15 data-[in-range]:text-foreground',
      'selection-start:bg-brand selection-start:text-brand-foreground selection-start:rounded-l-lg',
      'selection-end:bg-brand selection-end:text-brand-foreground selection-end:rounded-r-lg',
      ...calendarCellBase,
    ],
  }),
};
