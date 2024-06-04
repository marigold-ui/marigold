import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva(''),
  tabpanel: cva(''),
  tabsList: cva('mb-4 border-b'),
  tab: cva([
    'text-text-primary-muted aria-selected:text-text-primary px-2 py-1 text-sm font-medium',
    'aria-selected:border-border-primary -m-px border-b-2 border-transparent',
    'focus:outline-none focus-visible:outline',
  ]),
};
