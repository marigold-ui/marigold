import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva({
    base: '',
    variants: {
      variant: {
        demo: 'my-6',
      },
    },
  }),
  tabpanel: cva({ base: '' }),
  tabsList: cva({ base: 'mb-4 border-b' }),
  tab: cva({
    base: [
      'relative text-text-primary-muted aria-selected:text-text-primary px-2 py-1 text-sm font-medium',
      '-m-px border-b-2 border-transparent',
      'focus:outline-hidden focus-visible:ui-state-focus',
    ],
  }),
  tabIndicator: cva({
    base: [
      'absolute inset-x-0 bottom-0 -mb-px h-0.5 border-b-2 border-border-primary',
      'origin-left',
    ],
  }),
};
