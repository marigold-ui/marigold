import { ThemeComponent, cva } from '@marigold/system';

export const Tray: ThemeComponent<'Tray'> = {
  // The drag handle above it comes from `Sheet.dragHandle`.
  container: cva({
    base: 'grid grid-rows-[auto_1fr_auto]',
  }),
  header: cva({ base: 'ui-surface-header' }),
  title: cva({ base: 'font-semibold text-base' }),
  description: cva({ base: 'text-sm text-secondary mt-0.5' }),
  content: cva({ base: 'ui-surface-content' }),
  actions: cva({ base: 'ui-surface-actions' }),
};
