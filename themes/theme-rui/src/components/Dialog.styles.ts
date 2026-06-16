import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva({ base: ['absolute top-6 right-3', 'size-7'] }),
  container: cva({
    base: [
      'flex flex-col gap-0 rounded-xl overflow-y-auto',
      'ui-surface shadow-elevation-overlay ui-scrollbar',
    ],
    variants: {
      variant: {},
      // Does not do anything, just to make the size appear in the appearance demo (Modal is setting the size)
      size: {
        xsmall: '',
        small: '',
        medium: '',
        large: '',
      },
    },
  }),
  header: cva({
    base: 'flex flex-col text-center sm:text-left px-6 pt-6',
  }),
  title: cva({ base: 'text-lg font-semibold mb-1' }),
  content: cva({ base: 'ui-panel-content text-sm' }),
  actions: cva({
    base: 'ui-panel-actions flex-col-reverse sm:flex-row',
  }),
};
