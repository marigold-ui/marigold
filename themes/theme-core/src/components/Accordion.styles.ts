import { ThemeComponent, cva } from '@marigold/system';

export const Accordion: ThemeComponent<'Accordion'> = {
  container: cva('flex flex-col'),
  item: cva('p-2'),
  header: cva([
    'group',
    'inline-flex items-center justify-center gap-[0.5ch]',
    'bg-bg-surface w-full justify-between border-none py-1',
    'font-bold leading-[1.125]',
  ]),
  content: cva(),
  icon: cva('h3 w-6'),
};
