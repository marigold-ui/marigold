import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva({
    base: [
      'border-border bg-bg-surface overflow-hidden rounded-md border px-1 py-1.5 text-sm shadow-md',
      'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
    ],
    variants: {
      variant: {
        command:
          '[&_[cmdk-list-sizer]]:divide-secondary-100 size-full p-0 sm:w-[500px] [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:py-2 [&_[cmdk-item]_svg]:size-5 [&_[cmdk-list-sizer]]:divide-y',
      },
    },
  }),
  item: cva({
    base: 'focus:bg-bg-hover cursor-pointer rounded-xs p-2 outline-hidden',
    variants: {
      variant: {
        command: ['aria-selected:bg-bg-hover px-4 py-1.5'],
      },
    },
  }),
  section: cva({
    base: '',
    variants: {
      variant: {
        command:
          '[&_[cmdk-group-heading]]:text-text-primary-muted [&_[cmdk-group-heading]]:p-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
      },
    },
  }),
  button: cva({
    base: 'text-secondary-700 hover:bg-secondary-400/20 h-8 rounded-lg px-1',
  }),
};
