import { ThemeComponent, cva } from '@marigold/system';

export const Accordion: ThemeComponent<'Accordion'> = {
  container: cva('flex-col', {
    variants: {
      variant: {
        default: '',
        card: 'space-y-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  item: cva('bg-background border-b last:border-b-0 border-border', {
    variants: {
      variant: {
        default: '',
        card: [
          'ui-surface shadow-elevation-raised py-1 outline-none last:border-b',
          // Show focus border when the trigger is focused
          'has-[[slot=trigger]:focus-visible]:ui-state-focus outline-none',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva(
    [
      'flex w-full items-center justify-between gap-4 py-2 rounded-md cursor-pointer text-foreground',
      'text-left text-base font-semibold leading-6 transition-all',
      'hover:no-underline',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
    ],
    {
      variants: {
        variant: {
          default: 'focus-visible:ui-state-focus outline-none',
          card: 'px-4 outline-none',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  panel: cva(
    'overflow-clip h-(--disclosure-panel-height) transition-[height,padding] duration-250'
  ),
  content: cva('pb-2', {
    variants: {
      variant: {
        default: '',
        card: 'px-4',
      },
    },
  }),
  icon: cva(
    'pointer-events-none shrink-0 opacity-60 transition-transform duration-250'
  ),
};
