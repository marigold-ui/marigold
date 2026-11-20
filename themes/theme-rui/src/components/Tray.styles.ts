import { ThemeComponent, cva } from '@marigold/system';

export const Tray: ThemeComponent<'Tray'> = {
  container: cva({
    base: 'grid grid-rows-[auto_auto_1fr_auto]',
  }),
  dragHandle: cva({
    base: 'bg-border mx-auto mt-2 h-1.5 w-12 rounded-full',
  }),
  header: cva({ base: 'ui-surface-header' }),
  title: cva({ base: 'font-semibold text-base' }),
  description: cva({ base: 'text-sm text-secondary mt-0.5' }),
  content: cva({ base: 'ui-surface-content' }),
  actions: cva({ base: 'ui-surface-actions' }),
};
