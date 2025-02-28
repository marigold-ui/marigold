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
  item: cva('border-b last:border-b-0 data-[expanded]:pb-2', {
    variants: {
      variant: {
        default: '',
        card: 'bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva(
    [
      'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 w-full items-center justify-between gap-4 rounded-md py-2 text-left text-sm font-semibold',
      ' transition-all outline-none hover:no-underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:text-disabled-foreground leading-6',
    ],
    {
      variants: {
        variant: {
          default: '',
          card: 'hover:no-underline focus-visible:ring-0',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  content: cva(
    'overflow-hidden text-sm data-[expanded]:animate-accordion-down data-[expanded=false]:animate-accordion-up '
  ),
  icon: cva(
    'pointer-events-none shrink-0 opacity-60 transition-transform duration-200'
  ),
};
