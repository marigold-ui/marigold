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
  item: cva('border-b last:border-b-0 border-border ', {
    variants: {
      variant: {
        default: '',
        card: [
          'rounded-md border px-4 py-1 outline-none last:border-b',
          'has-focus-visible:border-border has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva(
    [
      'flex flex-1 w-full items-center justify-between gap-4 rounded-md py-2 text-left text-sm font-semibold',
      ' transition-all outline-none hover:no-underline focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:text-disabled-foreground leading-6',
    ],
    {
      variants: {
        variant: {
          default:
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          card: 'hover:no-underline focus-visible:ring-0',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  content: cva(
    'overflow-hidden text-sm text-muted-foreground in-data-[expanded]:pb-2'
  ),
  icon: cva(
    'pointer-events-none shrink-0 opacity-60 transition-transform duration-200'
  ),
};
