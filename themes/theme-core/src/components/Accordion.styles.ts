import { ThemeComponent, cva } from '@marigold/system';

export const Accordion: ThemeComponent<'Accordion'> = {
  button: cva([
    'group',
    'bg-bg-surface w-full justify-between border-none px-2 py-1',
    'font-bold leading-[1.125]',
  ]),
  item: cva('p-2'),
};
