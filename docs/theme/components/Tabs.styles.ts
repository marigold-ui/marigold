import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  tabs: cva('mb-4 border-b'),
  tab: cva([
    'text-text-primary-muted aria-selected:text-text-primary px-2 py-1 font-medium',
    'aria-selected:border-border -m-px border-b-2 border-transparent',
  ]),
};
