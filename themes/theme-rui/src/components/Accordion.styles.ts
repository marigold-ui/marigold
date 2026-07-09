import { ThemeComponent, cva } from '@marigold/system';

export const Accordion: ThemeComponent<'Accordion'> = {
  container: cva({
    // Horizontal padding for header/content. Resolves to the Panel's
    // `--panel-px` when nested inside a Panel (so a bled Panel keeps dividers
    // edge-to-edge while header/content align with the Panel title, mirroring
    // Table), otherwise falls back to `0px` — standalone Accordions are
    // unchanged.
    base: 'flex-col [--accordion-x-padding:var(--panel-px,0px)]',
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
  item: cva({
    variants: {
      variant: {
        default: ['bg-surface border-b last:border-b-0 border-border'],
        card: [
          'ui-surface shadow-elevation-raised py-1 outline-none',
          // Show focus border when the trigger is focused
          'has-[[slot=trigger]:focus-visible]:ui-state-focus outline-none',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva({
    base: [
      'flex w-full items-center justify-between gap-4 py-2 rounded-md cursor-pointer text-foreground',
      'text-left text-base font-semibold leading-6',
      'hover:no-underline',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        default:
          'focus-visible:ui-state-focus outline-none px-(--accordion-x-padding)',
        card: 'px-4 outline-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  panel: cva({
    base: 'overflow-clip h-(--disclosure-panel-height) transition-[height,padding] duration-250 px-1 -mx-1',
  }),
  content: cva({
    base: 'pt-1 pb-2',
    variants: {
      variant: {
        default: 'px-(--accordion-x-padding)',
        card: 'px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  icon: cva({
    base: 'pointer-events-none shrink-0 text-secondary transition-transform duration-250',
  }),
};
