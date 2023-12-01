import { ThemeComponent, cva } from '@marigold/system';

export const Calendar: ThemeComponent<'Calendar'> = {
  calendar: cva('disabled:text-text-disabled bg-white'),
  calendarCell: cva([
    'data-[disabled]:text-text-disabled',
    'data-[hover]:bg-bg-primary-light',
    'data-[selected]:bg-bg-selected-input outline-none data-[selected]:font-semibold data-[selected]:text-white',
  ]),
  calendarControllers: cva([
    '[&_button[data-hovered]]:bg-bg-hover [&_button[data-hovered]]:text-text-hover',
  ]),
};
