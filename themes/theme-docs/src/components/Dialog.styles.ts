import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  closeButton: cva({
    base: 'absolute top-4 right-4 ml-4',
    variants: {
      variant: {
        fullscreen: ['size-6', 'right-4 top-4'],
      },
    },
  }),
  container: cva({
    base: 'bg-bg-surface',
    variants: {
      variant: {
        default: 'relative rounded-lg shadow-lg',
        codeblock: [
          'static px-0 py-6',
          'bg-code-900 max-h-[96vh] w-full overflow-y-auto rounded-lg shadow-lg',
          'scrollbar-thin scrollbar-thumb-code-500 scrollbar-track-transparent scrollbar-thumb-rounded-full overflow-x-auto',
          '*:max-h-none *:min-w-[75vw]',
        ],
        fullscreen: 'h-screen w-screen px-4 pb-8 pt-10',
        zoom: 'max-h-[96vh] overflow-y-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva({ base: '' }),
  title: cva({ base: '' }),
  content: cva({ base: '' }),
  actions: cva({ base: '' }),
};
