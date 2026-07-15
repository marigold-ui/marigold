import { ThemeComponent, cva } from '@marigold/system';

export const Accordion: ThemeComponent<'Accordion'> = {
  container: cva({
    // Horizontal inset for header/content. Sourced from `--bleed-px`, which a
    // bled `Panel.Content`/`Panel.CollapsibleContent` publishes (set to the
    // Panel's `--panel-px`). Inside a bled Panel this keeps item dividers
    // edge-to-edge while header/content align with the Panel title, mirroring
    // Table. Falls back to `0px` everywhere else, so standalone Accordions and
    // Accordions in a non-bled `Panel.Content` are unchanged.
    base: 'flex-col [--accordion-x-padding:var(--bleed-px,0px)]',
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
          'ui-surface py-1 outline-none',
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
        default: [
          'focus-visible:ui-state-focus outline-none',
          // In a bled Panel the header spans the full width, so inset it (and
          // its focus ring) off the Panel border by one spacing step, like
          // `Panel.Collapsible`. `--accordion-ring-inset` is `0` unless bled,
          // so the margin/width collapse to a plain full-width header and the
          // padding to `0` — standalone and non-bled Accordions are unchanged.
          '[--accordion-ring-inset:min(var(--accordion-x-padding),var(--spacing))]',
          'mx-(--accordion-ring-inset)',
          'w-[calc(100%-var(--accordion-ring-inset)-var(--accordion-ring-inset))]',
          'px-[calc(var(--accordion-x-padding)-var(--accordion-ring-inset))]',
        ],
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
  actions: cva({
    base: 'shrink-0',
    variants: {
      variant: {
        default: '',
        card: 'pe-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
