import { ThemeComponent, cva } from '@marigold/system';

export const Accordion: ThemeComponent<'Accordion'> = {
  container: cva('flex-col duration-1000', {
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
  item: cva('border-b last:border-b-0 border-border ', {
    variants: {
      variant: {
        default: '',
        card: [
          'rounded-md border px-4 py-1 outline-none last:border-b',
          // TODO: focus is still shown even if an item within the item is focused
          'has-focus-visible:util-focus-ring outline-none',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva(
    [
      'flex flex-1 w-full items-center justify-between gap-4 rounded-md py-2 cursor-pointer',
      'text-left text-sm font-semibold leading-6 transition-all',
      'hover:no-underline',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
    ],
    {
      variants: {
        variant: {
          default: 'focus-visible:util-focus-ring outline-none',
          card: 'outline-none',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  content: cva('*:pb-2'),
  icon: cva('pointer-events-none shrink-0 opacity-60 transition-transform'),
};
